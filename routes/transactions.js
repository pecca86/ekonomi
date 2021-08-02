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
  updateManyTransactions,
  deleteManyTransactions,
  createManyTransactions
} = require("../controllers/transactions");
const { protectedRoute } = require("../middleware/auth");
const Transaction = require("../models/Transaction");
const accountFilters = require("../middleware/accountFilters");

router
  .route("/")
  .get(
    protectedRoute,
    accountFilters(Transaction, "", "transaction"),
    getTransactions
  )
  .put(protectedRoute, updateManyTransactions)
  .delete(protectedRoute, deleteManyTransactions)

router
  .route("/:transactionId")
  .get(protectedRoute, getTransaction)
  .put(protectedRoute, updateTransaction)
  .delete(protectedRoute, deleteTransaction);

router.route("/:accountId").post(protectedRoute, createTransaction);
router.route("/:accountId/createmany").post(protectedRoute, createManyTransactions)

module.exports = router;
