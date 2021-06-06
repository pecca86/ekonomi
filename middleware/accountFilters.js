/* For adding filter and query possibilities to our routes */
const ErrorResponse = require("../utils/errorResponse");
const Transaction = require("../models/Transaction");
const Account = require("../models/Account");
const mongoose = require("mongoose");
const { EJSON } = require('bson')
const { v4: uuidv4 } = require('uuid');

const accountFilters =
  (model, populate, type = "") =>
  async (req, res, next) => {
    // If there is a accountId passed in by the params, check if it is a valid one
    if (req.params.accountId) {
      if (!mongoose.Types.ObjectId.isValid(req.params.accountId)) {
        return next(new ErrorResponse("Invalid account ID", 400));
      }

      // This saves the query to the account, so that we can fetch old queries upon loading the object
      const account = await Account.findById(req.params.accountId)
      // create a unique id for this query and put it inside the query
      req.query.id = uuidv4()
      account.accountQueries.push(EJSON.stringify(req.query))
      await account.save()
      // nullify the id so that it does not break the other queries
      req.query.id = null
    }

    // === QUERIES ===
    let query;
    // Enable selecting specific fields with specific values
    const requestQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit"]; // these are set in the url
    // Loop over removeFields and delete them from request query
    removeFields.forEach((param) => delete requestQuery[param]);

    // stringify the query
    let queryStr = JSON.stringify(requestQuery);
    // find some of the mongoose operators and put a $ infront of it
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    qStr = JSON.parse(queryStr);
    // parse querystring back to json format and search accounts that match the userId and query
    // Check also if the given model is of type account and if the accountId parameter is specified
    // This means the user is requesting all transfers from a specific account

    if (type === "transaction" && req.params.accountId) {
      query = model
        .find({
          $and: [
            { account: req.params.accountId },
            { user: req.user.id },
            qStr,
          ],
        })
        .select("-account");
    } else {
      query = model.find({
        $and: [{ user: req.user.id }, qStr],
      });
    }

    // Select fields from database if select is set in url
    if (req.query.select) {
      // field object is in a csv format in the url
      // split into an array where there are commas
      // then join back into a string separating each word with a space
      // mongoose takes the select options in as an array with spaces between what is selected
      const fields = req.query.select.split(",").join(" ");
      // add on select fields to query
      query = query.select(fields);
    }

    // == SORT FIELDS ==
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      // default sort
      query = query.sort("-createdAt");
    }

    // == PAGINATION ==
    const page = parseInt(req.query.page, 10) || 1; // set page to 1 if no page in query
    // set how many bootcamps per page, default after ||
    const limit = parseInt(req.query.limit, 10) || 20;
    // how many bootcamps we want to skip
    const pageStartIndex = (page - 1) * limit;
    const pageEndIndex = page * limit;
    const totalPages = await model.countDocuments();
    query = query.skip(pageStartIndex).limit(limit);

    // check if populate param is given
    if (populate) {
      query = query.populate(populate);
    }

    const results = await query; // finds all model results according to set query

    // === CALCULATE GIVEN TIMEINTERVALL'S TRANSACTION SUM ===
    // If we are requesting transactiondata from a single account, we want to count the total sum of that
    // intervall
    let calculatedTransactionSum;
    if (type === "transaction" && req.params.accountId) {
      calculatedTransactionSum = 0;
      results.forEach((result) => (calculatedTransactionSum += result.sum));
    }

    // pagination result that enables checking next and previous page
    const pagination = {};

    // if no next page
    if (pageEndIndex < totalPages) {
      // our pagination object has a nextPage prop with a page variable
      pagination.nextPage = {
        page: page + 1,
        limit,
      };
    }

    // if no previous page
    if (pageStartIndex > 0) {
      pagination.previousPage = {
        page: page - 1,
        limit,
      };
    }

    // === TRANSACTION SUM ===
    let transactionSum;

    // response
    res.accountFilters = {
      success: true,
      count: results.length,
      calculatedTransactionSum,
      pagination,
      data: results,
      transactionSum,
    };

    next();
  };

module.exports = accountFilters;
