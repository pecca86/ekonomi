const TimeSpan = require('../models/TimeSpan')
const Account = require('../models/Account')
const wrapAsync = require("../middleware/wrapAsync");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Create a new transaction inside an account transactions
// @route   POST /api/v1/timespans/:accountId
// @access  Private
exports.createTimeSpan = wrapAsync(async (req, res, next) => {
    // put the bootcamp id and user inside the req.body
    req.body.account = req.params.accountId;
    req.body.user = req.user.id;
  
    const account = await Account.findById(req.params.accountId);
    if (!account) {
      return next(new ErrorResponse("No account found.", 404));
    }
  
    // Check if user owns the account
    if (account.user.toString() !== req.user.id) {
      return next(new ErrorResponse("Not authorized!", 400));
    }
  
    console.log(req.body);
    // create a transaction that is associated with this account
    const timeSpan = new TimeSpan(req.body);
    await timeSpan.save();
  
    // push the newly created transaction to the account that it is associated with
    //account.accountTransactions.push(transaction);
    //await account.save();
  
    res.status(201).json({
      data: timeSpan,
    });
  });