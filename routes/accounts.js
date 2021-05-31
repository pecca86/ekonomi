const express = require("express");
const router = express.Router();
const {
  createAccount,
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/accounts");

// Include other resource routers
const transactionRouter = require('./transactions');
// Re-route into other resource routers
// Any URL that includes bootcampId will go trough this route
router.use('/:accountId/transactions', transactionRouter);


router.route("/").get(getAccounts).post(createAccount);

router
  .route("/:accountId")
  .get(getAccount)
  .put(updateAccount)
  .delete(deleteAccount);

module.exports = router;
