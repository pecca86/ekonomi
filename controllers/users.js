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
