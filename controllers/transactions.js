const Transaction = require("../models/Transaction");
const Account = require("../models/Account");
const TransactionCategory = require('../models/TransactionCategory')
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
  const transaction = await Transaction.findById(
    req.params.transactionId
  ).populate("account", "IBAN").populate("category", "transactionCategory");

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
  req.body.sum = parseFloat(req.body.sum).toFixed(2)

  const account = await Account.findById(req.params.accountId);
  if (!account) {
    return next(new ErrorResponse("No account found.", 404));
  }

  // Check if user owns the account
  if (account.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized!", 400));
  }

  // Check if given transaction category is owned by the user
  const transactionCategory = await TransactionCategory.findById(req.body.category)
  if (!transactionCategory) {
    return next(new ErrorResponse("No category found!", 404))
  }

  if (transactionCategory.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Invalid Category for this User", 400));
  }

  // Check if transaction type is of Spending and turn the value into negative
  if (req.body.transactionType === 'Spending') {
    req.body.sum = -Math.abs(req.body.sum);
    console.log("CONVERTERD!");
  }

  // create a transaction that is associated with this account
  console.log(req.body);
  const transaction = new Transaction(req.body);
  await transaction.save();

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

  transaction = await Transaction.findByIdAndUpdate(
    req.params.transactionId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({
    data: transaction,
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
