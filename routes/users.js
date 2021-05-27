const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { createUser } = require("../controllers/users");

router.route('/')
    .post(createUser)

module.exports = router;
