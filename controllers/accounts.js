const Account = require("../models/Account");
const wrapAsync = require("../middleware/wrapAsync");
const ErrorResponse = require("../utils/errorResponse");

// TODO: Controller function for verifying user to account

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
  res.status(200).json(res.accountFilters);
});

// @desc    Get details of single account
// @route   GET /api/v1/accounts/:accountId
// @access  Private
exports.getAccount = wrapAsync(async (req, res, next) => {
  const account = await Account.findOne({ _id: req.params.accountId });
  if (!account) {
    return next(new ErrorResponse("No account found.", 404));
  }
  // Check if the user requesting for the account details is the owner of the account
  if (account.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized!", 400));
  }

  res.status(200).json({
    data: account,
  });
});

// @desc    Update a specific account
// @route   PUT /api/v1/accounts/:accountId
// @access  Private
exports.updateAccount = wrapAsync(async (req, res, next) => {
  let account = await Account.findById(req.params.accountId);
  if (!account) {
    return next(new ErrorResponse("No account found.", 404));
  }
  // Check if the user requesting for the account details is the owner of the account
  if (account.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized!", 400));
  }

  account = await Account.findByIdAndUpdate(req.params.accountId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(202).json({
    data: account,
  });
});

// @desc    Delete a account
// @route   POST /api/v1/accounts/:accountId
// @access  Private
exports.deleteAccount = wrapAsync(async (req, res, next) => {
  const account = await Account.findById(req.params.accountId);

  if (!account) {
    return next(new ErrorResponse("No account found.", 404));
  }
  // Check if the user requesting for the account details is the owner of the account
  if (account.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized!", 400));
  }

  await account.remove();

  res.status(200).json({
    msg: "Account and corresponding Transactions were deleted!",
  });
});
