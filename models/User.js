const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please add a first name"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Please add a first name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please add a email address"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
      type: String,
      required: [true, "Please enter a password"]
  }
});

module.exports = mongoose.model("User", UserSchema);