const Account = require("../models/Account");
const wrapAsync = require("../middleware/wrapAsync");

// @desc    Register a new account
// @route   POST /api/v1/accounts
// @access  Private
exports.createAccount = wrapAsync(async(req, res, next) => {
    res.status(200).json({
        msg: "account created!"
    })
})

// @desc    Get logged in user's all accounts
// @route   GET /api/v1/accounts
// @access  Private
exports.getAccounts = wrapAsync(async(req, res, next) => {
    res.status(200).json({
        msg: "List of all accounts!"
    })
})

// @desc    Get details of single account
// @route   GET /api/v1/accounts/:accountId
// @access  Private
exports.getAccount = wrapAsync(async(req, res, next) => {
    res.status(200).json({
        msg: "Single account details!"
    })
})

// @desc    Update a specific account
// @route   PUT /api/v1/accounts/:accountId
// @access  Private
exports.updateAccount = wrapAsync(async(req, res, next) => {
    res.status(200).json({
        msg: "account updated!"
    })
})

// @desc    Delete a account
// @route   POST /api/v1/accounts/:accountId
// @access  Private
exports.deleteAccount = wrapAsync(async(req, res, next) => {
    res.status(200).json({
        msg: "account deleted!"
    })
})
