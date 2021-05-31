const User = require("../models/User");
const wrapAsync = require("../middleware/wrapAsync");

// @desc    Register a new user
// @route   POST /api/v1/users
// @access  Public
exports.createUser = wrapAsync(async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  const user = new User({ firstname, lastname, email, password });
  await user.save();

  res.status(201).json({
    user,
  });
});

// @desc    Updates existing user
// @route   PUT /api/v1/users/:userId
// @access  Private
exports.updateUser = wrapAsync(async (req, res, next) => {
/*   const { firstname, lastname, email, password } = req.body;
  const user = new User({ firstname, lastname, email, password });
  await user.save(); */

  res.status(201).json({
    msg: "update User info"
  });
});

// @desc    Logs in
// @route   POST /api/v1/users/login
// @access  Public
exports.loginUser = wrapAsync(async (req, res, next) => {
/*   const { firstname, lastname, email, password } = req.body;
  const user = new User({ firstname, lastname, email, password });
  await user.save(); */

  res.status(201).json({
    msg: "user logged in"
  });
});

// @desc    Logout a user
// @route   GET /api/v1/users/logout
// @access  Private
exports.logoutUser = wrapAsync(async (req, res, next) => {
/*   const { firstname, lastname, email, password } = req.body;
  const user = new User({ firstname, lastname, email, password });
  await user.save(); */

  res.status(201).json({
    msg: "User logged out"
  });
});

// @desc    Returns the info of logged in user
// @route   GET /api/v1/users/me
// @access  Private
exports.getLoggedInUser = wrapAsync(async (req, res, next) => {
/*   const { firstname, lastname, email, password } = req.body;
  const user = new User({ firstname, lastname, email, password });
  await user.save(); */

  res.status(201).json({
    msg: "Currently logged in user"
  });
});