const mongoose = require("mongoose");

const TransactionCategorySchema = new mongoose.Schema({
  transactionCategory: {
    type: String,
    required: [true, "Please enter the category name."],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model(
  "TransactionCategory",
  TransactionCategorySchema
);
