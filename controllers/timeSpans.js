const TimeSpan = require("../models/TimeSpan");
const Account = require("../models/Account");
const wrapAsync = require("../middleware/wrapAsync");
const ErrorResponse = require("../utils/errorResponse");

exports.getTransactions = wrapAsync(async (req, res, next) => {
  res.status(200).json(res.accountFilters);
});

// @desc    Get all time spans for a account
// @route   GET /api/v1/timespans/:accountId
// @access  Private
exports.getTimeSpans = wrapAsync(async (req, res, next) => {
  const account = await Account.findById(req.params.accountId);
  // Check if user owns the transaction
  if (account.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized!", 400));
  }

  const timeSpans = await TimeSpan.find({
    account: req.params.accountId,
  }).populate("account", "IBAN");

  if (!timeSpans) {
    return next(new ErrorResponse("No timeSpans found.", 404));
  }

  res.status(200).json({
    data: timeSpans,
  });
});

// @desc    Create a new timeSpan inside an account transactions
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

// @desc    Delete a transaction
// @route   DELETE /api/v1/timspans/:timeSpanId
// @access  Private
exports.deleteTimeSpan = wrapAsync(async (req, res, next) => {
  const timeSpan = await TimeSpan.findById(req.params.timeSpanId);
  if (!timeSpan) {
    return next(new ErrorResponse("Time Span not found.", 404));
  }
  // Check if the user requesting for the account details is the owner of the account
  if (timeSpan.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized!", 400));
  }

  await timeSpan.remove();

  res.status(200).json({
    msg: "Time Span deleted!",
  });
});

// @desc    Update an timeSpan
// @route   PUT /api/v1/timespans/:timeSpanId
// @access  Private
exports.updateTimeSpan = wrapAsync(async (req, res, next) => {
  let timeSpan = await TimeSpan.findById(req.params.timeSpanId);
  if (!timeSpan) {
    return next(new ErrorResponse("No timeSpan found!", 404));
  }

  // Check if the user requesting for the transaction details is the owner of the account
  if (timeSpan.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized!", 400));
  }

  timeSpan = await TimeSpan.findByIdAndUpdate(req.params.timeSpanId, req.body, {
    new: true,
    runValidators: true,
  }).populate("account", "IBAN");

  res.status(201).json({
    data: timeSpan,
  });
});
