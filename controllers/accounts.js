const Account = require("../models/Account");
const wrapAsync = require("../middleware/wrapAsync");
const ErrorResponse = require('../utils/errorResponse')

// @desc    Register a new account
// @route   POST /api/v1/accounts
// @access  Private
exports.createAccount = wrapAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const account = new Account(req.body);
  await account.save();

  res.status(200).json({
    data: account,
  });
});

// @desc    Get logged in user's all accounts
// @route   GET /api/v1/accounts
// @access  Private
exports.getAccounts = wrapAsync(async (req, res, next) => {
  const accounts = await Account.find({ user: req.user.id });
  res.status(200).json({
    count: accounts.length,
    data: accounts,
  });
});

// @desc    Get details of single account
// @route   GET /api/v1/accounts/:accountId
// @access  Private
exports.getAccount = wrapAsync(async (req, res, next) => {
  const account = await Account.findOne({ _id: req.params.accountId });
  if (! account) {
    return res.status(404).json({msg:"No account found"})
  }
  // Check if the user requesting for the account details is the owner of the account
  if (account.user.toString() !== req.user.id ) {
      return res.status(400).json({msg: "Unauthorized!"})
  }
  res.status(200).json({
    data: account
  });
});

// @desc    Update a specific account
// @route   PUT /api/v1/accounts/:accountId
// @access  Private
exports.updateAccount = wrapAsync(async (req, res, next) => {
  res.status(200).json({
    msg: "account updated!",
  });
});

// @desc    Delete a account
// @route   POST /api/v1/accounts/:accountId
// @access  Private
exports.deleteAccount = wrapAsync(async (req, res, next) => {
  const account = await Account.findById(req.params.accountId);

  if (!account) {
    throw new Error("no such account");
  }

  account.remove();

  res.status(200).json({
    msg: "account and corresponding transactions were deleted!",
  });
});
