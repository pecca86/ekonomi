const TransactionCategory = require("../models/TransactionCategory");
const wrapAsync = require("../middleware/wrapAsync");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Create a new transaction category for the user
// @route   POST /api/v1/transactioncategories
// @access  Private
exports.createTransactionCategory = wrapAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.transactionCategory = req.body.transactionCategory.toLowerCase()
  const transactionCategory = new TransactionCategory(req.body);
  await transactionCategory.save();

  res.status(200).json({
    data: transactionCategory,
  });
});

// @desc    Delete a account
// @route   DELETE /api/v1/transactioncategories/
// @access  Private
exports.deleteTransactionCategory = wrapAsync(async (req, res, next) => {
  const transactionCategory = await TransactionCategory.findById(
    req.params.transactionCategoryId
  );

  if (!transactionCategory) {
    return next(new ErrorResponse("No transaction category found.", 404));
  }
  // Check if the user requesting for the account details is the owner of the account
  if (transactionCategory.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized!", 400));
  }

  await transactionCategory.remove();

  res.status(200).json({
    msg: "Transaction Category deleted!",
  });
});

// @desc    Update a specific Transaction Category
// @route   PUT /api/v1/transactioncategories/:transactionCategoryId
// @access  Private
exports.updatetransactionCategory = wrapAsync(async (req, res, next) => {
  let transactionCategory = await TransactionCategory.findById(
    req.params.transactionCategoryId
  );
  if (!transactionCategory) {
    return next(new ErrorResponse("No Transaction Category found.", 404));
  }
  // Check if the user requesting for the account details is the owner of the account
  if (transactionCategory.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized!", 400));
  }

  transactionCategory = await TransactionCategory.findByIdAndUpdate(
    req.params.transactionCategoryId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(202).json({
    data: transactionCategory,
  });
});

// @desc    Get details of single Transaction Category
// @route   GET /api/v1/transactioncategories/:transactionCategoryId
// @access  Private
exports.getTransactionCategory = wrapAsync(async (req, res, next) => {
  const transactionCategory = await TransactionCategory.findOne({
    _id: req.params.transactionCategoryId,
  });
  if (!transactionCategory) {
    return next(new ErrorResponse("No Transaction Category found.", 404));
  }
  // Check if the user requesting for the transactionCategory details is the owner of the transactionCategory
  if (transactionCategory.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized!", 400));
  }

  res.status(200).json({
    data: transactionCategory,
  });
});

// @desc    Get all user's transaction categories
// @route   GET /api/v1/transactioncategories/
// @access  Private
exports.getgetTransactionCategories = wrapAsync(async (req, res, next) => {
  const transactionCategories = await TransactionCategory.find({
    user: req.user.id,
  });
  res.status(200).json({
    data: transactionCategories,
  });
});
