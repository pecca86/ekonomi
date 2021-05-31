/* MIGHT HAVE TO CHANGE THIS TO ROUTE FROM THE ACCOUNT AS IN BOOTCAMP NODE API */

const express = require("express");
// In order for the re-routing from bootcamps to work we need to pass in an object
// into router that merges the url params
const router = express.Router({ mergeParams: true });

const {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactions");

router.route("/").get(getTransactions);

router
  .route("/:transactionId")
  .get(getTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);

router.route("/:accountId").post(createTransaction);

module.exports = router;
