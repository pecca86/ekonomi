const express = require("express");
// In order for the re-routing from bootcamps to work we need to pass in an object
// into router that merges the url params
const router = express.Router({ mergeParams: true });

const {
  createTimeSpan,
  deleteTimeSpan,
  updateTimeSpan,
  getTimeSpans,
} = require("../controllers/timeSpans");
const { protectedRoute } = require("../middleware/auth");

router
  .route("/:accountId")
  .post(protectedRoute, createTimeSpan)
  .get(protectedRoute, getTimeSpans);

router
  .route("/:timeSpanId")
  .delete(protectedRoute, deleteTimeSpan)
  .put(protectedRoute, updateTimeSpan);

module.exports = router;
