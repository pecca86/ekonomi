const express = require("express");
const router = express.Router();
const {
  createAccount,
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/accounts");

router.route("/").get(getAccounts).post(createAccount);

router
  .route("/:accountId")
  .get(getAccount)
  .put(updateAccount)
  .delete(deleteAccount);

module.exports = router;
