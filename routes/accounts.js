const express = require("express");
const router = express.Router();
const {
  createAccount,
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/accounts");
const { protectedRoute } = require("../middleware/auth");
const accountFilters = require('../middleware/accountFilters')
const Account = require('../models/Account')

// Include other resource routers
const transactionRouter = require('./transactions');
// Re-route into other resource routers
// Any URL that includes bootcampId will go trough this route
router.use('/:accountId/transactions', transactionRouter);

//router.get('/', protectedRoute, getAccounts)
//router.post('/', createAccount)
router.route("/").get(protectedRoute, accountFilters(Account, 'accountTransactions'), getAccounts).post(protectedRoute, createAccount);

router
  .route("/:accountId")
  .get(protectedRoute, getAccount)
  .put(protectedRoute, updateAccount)
  .delete(protectedRoute, deleteAccount);

module.exports = router;
