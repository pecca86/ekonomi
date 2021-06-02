const mongoose = require("mongoose");
const Transaction = require("./Transaction");

const AccountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name to the account"],
    },
    IBAN: {
      type: String,
      required: [true, "IBAN is required"],
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    allTransactionsSum: Number,
    accountType: {
      type: String,
      enum: ["savings", "checking"],
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    accountTransactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Mongoose middleware for deletion of Accounts and any model's data that is refered to (transactions)
// mongoose findOneAndDelete is used with findByIdAndDelete
// doc referes to the model passed in (this case campground)
// this is a query middleware that passes in the doc to the function
AccountSchema.post("remove", async function (doc) {
  if (doc) {
    await Transaction.deleteMany({
      //passes in the id for each transaction...
      _id: {
        $in: doc.accountTransactions,
      },
    });
  }
});

module.exports = mongoose.model("Account", AccountSchema);
