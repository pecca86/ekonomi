const mongoose = require("mongoose");

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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Cascade delete Account related transactions when a Account is deleted
// IMPORTANT! This pre hook does not work with mongoose findByIdAndDelete
// use findById to get the Account, then Account.remove() => this will trigger this middleware
AccountSchema.pre("remove", async function (next) {
  // delete only those courses that are in this Account
  await this.model("Transaction").deleteMany({ account: this._id });
  await this.model("TimeSpan").deleteMany({ account: this._id });
  next();
});

module.exports = mongoose.model("Account", AccountSchema);
