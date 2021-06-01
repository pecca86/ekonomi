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
router.route("/:userId").put(protectedRoute, updateUser);
router.route("/login").post(loginUser);
router.route("/logout").get(protectedRoute, logoutUser);
router.route("/me").get(protectedRoute, getLoggedInUser);

module.exports = router;
