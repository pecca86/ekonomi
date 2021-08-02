const Transaction = require("../models/Transaction");
const Account = require("../models/Account");
const TransactionCategory = require("../models/TransactionCategory");
const wrapAsync = require("../middleware/wrapAsync");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get logged in user's all transactions or account specific transactions.
//          This route has filters options available.
// @route   GET /api/v1/transactions
// @route   GET /api/v1/accounts/:accountId/transactions
// @access  Private
exports.getTransactions = wrapAsync(async (req, res, next) => {
  res.status(200).json(res.accountFilters);
});

// @desc    Get single transaction
// @route   GET /api/v1/transactions/:transactionId
// @access  Private
exports.getTransaction = wrapAsync(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.transactionId)
    .populate("account", "IBAN")
    .populate("category", "transactionCategory");

  if (!transaction) {
    return next(new ErrorResponse("No transaction found.", 404));
  }

  // Check if user owns the transaction
  if (transaction.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized!", 400));
  }

  res.status(200).json({
    data: transaction,
  });
});

// @desc    Create a new transaction inside an account transactions
// @route   POST /api/v1/transactions/:accountId
// @access  Private
exports.createTransaction = wrapAsync(async (req, res, next) => {
  // put the bootcamp id and user inside the req.body
  req.body.account = req.params.accountId;
  req.body.user = req.user.id;
  // Make the sum have max two decimals
  req.body.sum = parseFloat(req.body.sum).toFixed(2);

  const account = await Account.findById(req.params.accountId);
  if (!account) {
    return next(new ErrorResponse("No account found.", 404));
  }

  // Check if user owns the account
  if (account.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized!", 400));
  }

  // Check if given transaction category is owned by the user
  let transactionCategory = await TransactionCategory.findById(
    req.body.category
  );
  // check if exist
  if (!transactionCategory) {
    transactionCategory = await TransactionCategory.find({
      transactionCategory: "Uncategorized",
      user: req.user.id,
    });
    // Returns an array that should only consist of one element
    transactionCategory = transactionCategory[0];
    // Check if there is already a category named Uncategorized, if not create one
    if (!transactionCategory) {
      req.body.transactionCategory = "Uncategorized";
      transactionCategory = await new TransactionCategory(req.body);
      await transactionCategory.save();
    }
  }

  if (transactionCategory.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Invalid Category for this User", 400));
  }

  // If there is no category passed into our body we insert the newly created / found Uncategorized category
  if (!req.body.category) {
    req.body.category = transactionCategory._id;
  }

  // Check if transaction type is of Spending and turn the value into negative
  if (req.body.transactionType === "Spending") {
    req.body.sum = -Math.abs(req.body.sum);
  }

  // create a transaction that is associated with this account
  let transaction = new Transaction(req.body);
  await transaction.save();

  // Find transaction again so we can populate the category field for our frontend
  transaction = await Transaction.findById(transaction._id).populate(
    "category",
    "transactionCategory"
  );

  res.status(201).json({
    data: transaction,
  });
});

// @desc    Update an transaction
// @route   PUT /api/v1/transactions/:transactionId
// @access  Private
exports.updateTransaction = wrapAsync(async (req, res, next) => {
  let transaction = await Transaction.findById(req.params.transactionId);
  if (!transaction) {
    return next(new ErrorResponse("No transaction found!", 404));
  }

  // Check if the user requesting for the transaction details is the owner of the account
  if (transaction.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized!", 400));
  }

  // If ONLY transactionType is provided in the body, we first check if there is a sum in the body as well, if not we take
  // the actual transaction sum and turn it into a negative number
  // If only the SUM is provided, we need to check if the transaction type is of spending or income in order to make the sum postivie (default) or negative.
  if (
    (req.body.transactionType === "Spending" &&
      (req.body.sum > 0 || transaction.sum > 0)) ||
    (req.body.transactionType === "Income" &&
      (req.body.sum < 0 || transaction.sum < 0)) ||
    (req.body.sum > 0 && transaction.transactionType === "Spending")
  ) {
    req.body.sum = -1 * req.body.sum || -1 * transaction.sum;
  }

  transaction = await Transaction.findByIdAndUpdate(
    req.params.transactionId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  // Find transaction again so we can populate the category field for our frontend
  transaction = await Transaction.findById(transaction._id).populate(
    "category",
    "transactionCategory"
  );

  res.status(201).json({
    data: transaction,
  });
});

// Takes in a list of transaction ID's and updates one or several fields
exports.updateManyTransactions = wrapAsync(async (req, res, next) => {
  const transactionIdList = req.body.transactionIdList;
  const data = req.body.data;
  const transactions = [];
  let tempSum;
  // Loop trough id list to find matching transactions
  for (let id of transactionIdList) {
    let tr = await Transaction.findById(id);

    if (tr.user.toString() !== req.user.id) {
      return next(new ErrorResponse("Not authorized!", 400));
    }

    // Check if sum is given
    if (req.body.data.sum) {
      // If sum is given and the transaction type is of 'Spending', we need to convert to sum to a negative number
      if (tr.transactionType === "Spending") {
        // We store the original sum in a temp variable
        tempSum = req.body.data.sum;
        req.body.data.sum = tempSum * -1;
      }
    }

    // If the user changed the transaction type to spending, and the transaction is a positive number, we convert it to a negative one.
    if (req.body.data.transactionType === "Spending" && tr.sum > 0) {
      req.body.data.sum = tr.sum * -1;
      console.log(req.body.data);
    }

    // If the transaction type is of 'Income' and the sum is a negative number, we convert it into a positive number
    if (req.body.data.transactionType === "Income" && tr.sum < 0) {
      req.body.data.sum = tr.sum * -1;
      console.log(req.body.data);
    }

    // We then update the transaction
    tr = await Transaction.findByIdAndUpdate(id, req.body.data, {
      new: true,
      runValidators: true,
    });

    // We need to fetch it again, so that our category and transactioncategory gets populated
    tr = await Transaction.findById(id).populate(
      "category",
      "transactionCategory"
    );

    // We then push the newly updated transaction to our transactions array
    transactions.push(tr);

    // If the tempSum has a value, we set the body.sum back to it. Otherwise the sum will be negative for the next loop.
    if (tempSum) {
      req.body.data.sum = tempSum;
    }
  }

  res.status(200).json({
    data: transactions,
  });
});

// @desc    Delete a transaction
// @route   DELETE /api/v1/transactions/:transactionId
// @access  Private
exports.deleteTransaction = wrapAsync(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.transactionId);
  if (!transaction) {
    return next(new ErrorResponse("Transaction not found.", 404));
  }
  // Check if the user requesting for the account details is the owner of the account
  if (transaction.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized!", 400));
  }

  await transaction.remove();

  res.status(200).json({
    msg: "Transaction deleted!",
  });
});

exports.deleteManyTransactions = wrapAsync(async (req, res, next) => {
  const transactions = [];
  for (let id of req.body.transactions) {
    let trans = await Transaction.findById(id);

    if (!trans) {
      return next(new ErrorResponse("Transaction not found.", 404));
    }
    // Check if the user requesting for the account details is the owner of the account
    if (trans.user.toString() !== req.user.id) {
      return next(new ErrorResponse("Not authorized!", 400));
    }

    await trans.remove()
  }

  res.status(200).json({
    msg: "Transactions Deleted!"
  })
});
