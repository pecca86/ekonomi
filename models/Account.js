const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
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
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
      type: Number
  },
  accountType: {
      type: String,
      enum: ['savings', 'checking']
  },
  accountTransactions: {
      type: [mongoose.Schema.ObjectId],
      ref: 'Transaction'
  }
});

module.exports = mongoose.model("Account", AccountSchema);
