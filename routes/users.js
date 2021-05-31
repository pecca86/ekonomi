const express = require("express");
const router = express.Router();
const User = require("../models/User");

const {
  createUser,
  updateUser,
  loginUser,
  logoutUser,
  getLoggedInUser,
} = require("../controllers/users");
const { protectedRoute } = require('../middleware/auth')

router.route("/").post(createUser);
router.route("/:userId").put(updateUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(getLoggedInUser);

module.exports = router;
