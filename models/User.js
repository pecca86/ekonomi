const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

// === MODEL MIDDLEWARE ===



// Encrypt the user password using bcrypt
UserSchema.pre("save", async function (next) {
  // Prevent this middleware for checking if password was filled when resetting it
  if (!this.isModified("password")) {
    next();
  }

  // use bcrpyt salt function that takes in parameter of how many rounds of salting
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // hashes the password with the salt
  next();
});

// == Sign a Jason Webtoken when user is created / signed in with JSONWEBTOKEN ==
UserSchema.methods.getSignedJwtToken = function () {
  // jwt.sign takes in a payload of the following:
  // id, secret, token expiration time
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// == Match user entered password to hashed password ==
UserSchema.methods.matchPassword = async function (enteredPassword) {
  // bcrypt method for comparing entered password to the specific user's password
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
