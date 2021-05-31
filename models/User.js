const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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
    required: [true, "Please enter a password"],
  },
});

// Sign a Jason Webtoken when user is created / signed in with JSONWEBTOKEN
UserSchema.methods.getSignedJwtToken = function () {
  // jwt.sign takes in a payload of the following:
  // id, secret, token expiration time
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("User", UserSchema);
