const express = require("express");
const router = express.Router();
const {
  createTransactionCategory,
  deleteTransactionCategory,
  updatetransactionCategory,
  getTransactionCategory,
  getgetTransactionCategories,
} = require("../controllers/transactionCategories");
const { protectedRoute } = require("../middleware/auth");

router
  .route("/")
  .post(protectedRoute, createTransactionCategory)
  .get(protectedRoute, getgetTransactionCategories);
router
  .route("/:transactionCategoryId")
  .delete(protectedRoute, deleteTransactionCategory)
  .put(protectedRoute, updatetransactionCategory)
  .get(protectedRoute, getTransactionCategory);

module.exports = router;
