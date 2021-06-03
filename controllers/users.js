const User = require("../models/User");
const wrapAsync = require("../middleware/wrapAsync");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Register a new user
// @route   POST /api/v1/users
// @access  Public
exports.createUser = wrapAsync(async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  const user = new User({ firstname, lastname, email, password });
  await user.save();

  sendTokenResponse(user, 201, res);
});

// @desc    Updates existing user
// @route   PUT /api/v1/users
// @access  Private
exports.updateUser = wrapAsync(async (req, res, next) => {
  // Specify which field we allow the user to update
  const updatableFields = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, updatableFields, {
    new: true,
    runValidators: true,
  }).select("-password");

  res.status(201).json({
    data: user,
  });
});

// @desc    route for updating the user's password, takes in currentPassword and newPassword
// @route   PUT /api/v1/users/password
// @access  Private
exports.updateUserPassword = wrapAsync(async (req, res, next) => {
  if (!req.body.currentPassword || !req.body.newPassword) {
    return next(
      new ErrorResponse("Please input old password and a new password!", 400)
      );
    }
    
    // find user and specifically select the password field also;
  const user = await User.findById(req.user.id).select("+password");

  // check if old password is correct using our models matchPassword method
  if (!user.matchPassword(req.body.currentPassword)) {
    return next(new ErrorResponse("Password is incorrect!", 401));
  }

  // assign the new password
  user.password = req.body.newPassword;
  await user.save(); // User model handles the hashin of the password

  sendTokenResponse(user, 200, res);
});

// @desc    Logs in
// @route   POST /api/v1/users/login
// @access  Public
exports.loginUser = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please enter email & password", 400));
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return next(new ErrorResponse("Invalid login credentials", 401));
  }

  const passwordValidated = await user.matchPassword(password);
  if (!passwordValidated) {
    return next(new ErrorResponse("Invalid login credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Logout a user
// @route   GET /api/v1/users/logout
// @access  Private
exports.logoutUser = wrapAsync(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 2 * 1000),
  });

  res.status(200).json({
    msg: "Logout successful",
  });
});

// @desc    Returns the info of logged in user
// @route   GET /api/v1/users/me
// @access  Private
exports.getLoggedInUser = wrapAsync(async (req, res, next) => {
  // gets the user minus the password
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({
      msg: "No user found",
    });
  }

  res.status(200).json({
    user,
  });
});

// === CONTROLLER FUNCTIONS ===

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create Jsonwebtoken for the user
  const token = user.getSignedJwtToken();

  // Create cookie
  const opts = {
    // end part converts it so that we get the number specified inside JWT_COOKIE_EXPIRE to days
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Send cookie trought https if in production
  if (process.env.NODE_ENV === "production") {
    opts.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, opts) // key, value, options
    .json({
      token,
    });
};
