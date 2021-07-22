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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TransactionCategory"
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

// === STATIC MODEL FUNCTIONS ===

// Total sum of transactions
TransactionSchema.statics.countAllTransactionsSum = async function (accountId) {
  // aggregate course costs and then count the average value
  const dataArray = await this.aggregate([
    {
      $match: { account: accountId },
    },
    {
      $group: {
        _id: "$account",
        allTransactionsSum: { $sum: "$sum" }, // which field we want to include when counting the sum
      },
    },
  ]);

  // update the allTransactionsSum field inside Account
  try {
    await this.model("Account").findByIdAndUpdate(accountId, {
      // Math function to discard decimals
      allTransactionsSum: dataArray[0].allTransactionsSum
    });
  } catch (err) {
    console.log("Failed to calculate account balance");
  }
};

// === PRE / POST HOOKS ===
// Functions that are called after model is saved
TransactionSchema.post('save', function () {
  this.constructor.countAllTransactionsSum(this.account);
})

// Functions that are called before a model is removed
TransactionSchema.post('remove', function () {
  this.constructor.countAllTransactionsSum(this.account);
})


module.exports = mongoose.model("Transaction", TransactionSchema);
