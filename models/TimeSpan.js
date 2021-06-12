const mongoose = require("mongoose");

const TimeSpanSchema = new mongoose.Schema({
  startDate: {
      type: String
  },
  endDate: {
      type: String
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

module.exports = mongoose.model("TimeSpan", TimeSpanSchema);
