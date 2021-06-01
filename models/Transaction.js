const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  sum: {
    type: Number,
    required: [true, "Please enter the sum of the transaction"],
  },
  transactionType: {
    type: String,
    required: [true, "Specify if income or spending"],
    enum: ["Income", "Spending"],
  },
  description: {
    type: String,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
