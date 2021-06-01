const Transaction = require("../models/Transaction");
const Account = require("../models/Account");
const wrapAsync = require("../middleware/wrapAsync");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get logged in user's all transactions
// @route   GET /api/v1/transactions
// @route   GET /api/v1/accounts/:accountId/transactions
// @access  Private
exports.getTransactions = wrapAsync(async (req, res, next) => {
  // Check if user is searching for transactions related to a specific account
  if (req.params.accountId) {
    // Check if user own the account and populate the accountTransactions
    const account = await Account.findById(req.params.accountId).populate('accountTransactions');
    if (account.user.toString() !== req.user.id) {
      return next(new ErrorResponse("Not authorized!", 400));
    }

    // Find all transactions related to this account
    const transactions = account.accountTransactions

    res.status(200).json({
      count: transactions.length,
      data: transactions,
    });
  
  // Provide all the user's transactions
  } else {
    const transactions = await Transaction.find({user: req.user.id}).populate('account', 'IBAN')

    res.status(200).json({
      count: transactions.length,
      data: transactions
    });
  }
});

// @desc    Get single transaction
// @route   GET /api/v1/transactions/:transactionId
// @access  Private
exports.getTransaction = wrapAsync(async (req, res, next) => {
  res.status(200).json({
    msg: "Single transaction",
  });
});

// @desc    Create a new transaction inside an account transactions
// @route   POST /api/v1/transactions/:accountId
// @access  Private
exports.createTransaction = wrapAsync(async (req, res, next) => {
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

  // create a transaction that is associated with this account
  const transaction = new Transaction(req.body);
  await transaction.save();

  // push the newly created transaction to the account that it is associated with
  account.accountTransactions.push(transaction);
  await account.save();

  res.status(201).json({
    data: transaction,
  });
});

// @desc    Update an transaction
// @route   PUT /api/v1/transactions/:transactionId
// @access  Private
exports.updateTransaction = wrapAsync(async (req, res, next) => {
  res.status(200).json({
    msg: "Updated a transaction!",
  });
});

// @desc    Delete a transaction
// @route   DELETE /api/v1/transactions/:transactionId
// @access  Private
exports.deleteTransaction = wrapAsync(async (req, res, next) => {
  res.status(200).json({
    msg: "Transaction deleted!",
  });
});
