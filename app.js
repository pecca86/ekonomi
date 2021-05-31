// === IMPORTS ===

// Setup Express
const express = require("express");
const app = express();

// Global app enviroment
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// Import Database setup
const connectDB = require("./config/db");

// NodeJS stuff
const path = require("path");

// Connect to DB
connectDB();

// Set browser cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// === MIDDLEWARE ===
// Body parser (for parsing json post)
app.use(express.json());

// === ROUTES ===
const users = require("./routes/users");
app.use("/api/v1/users", users);

const accounts = require("./routes/accounts");
app.use("/api/v1/accounts", accounts);

const transactions = require("./routes/transactions");
app.use("/api/v1/transactions", transactions);

// Errorhandling middleware for routes
// NEEDS TO COME AFTER ALL OTHER MIDDLEWARE!
const errorHandler = require("./middleware/error");
app.use(errorHandler);

// === Start server ===

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// === HANDLE UNHANDLED PROMISE REJECTIONS ===
process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandled rejection: ${err.message}`);
  // close server and exit
  server.close(() => process.exit(1));
});
