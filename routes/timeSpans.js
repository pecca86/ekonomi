const express = require("express");
// In order for the re-routing from bootcamps to work we need to pass in an object
// into router that merges the url params
const router = express.Router({ mergeParams: true });

const { createTimeSpan } = require("../controllers/timeSpans");
const { protectedRoute } = require("../middleware/auth");

router.route("/:accountId").post(protectedRoute, createTimeSpan);

module.exports = router;
