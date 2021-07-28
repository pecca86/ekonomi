// === IMPORTS ===

// Setup Express
const express = require("express");
const app = express();

// Global app enviroment
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// Import Database setup
const connectDB = require("./config/db");

// HTTP Logger
const morgan = require("morgan");

// NodeJS stuff
const path = require("path");

// Connect to DB
connectDB();

// Set browser cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// === APP SECURITY ===
// Sanitize incoming JSON requests for app security purposes
const mongoSanitize = require("express-mongo-sanitize");
// Security such as XSS etc.
const helmet = require("helmet");
// XSS
const xssClean = require("xss-clean");
// Limit how many requests a single user can post
const expressRateLimit = require("express-rate-limit");
// Http polution
const hpp = require("hpp");
// Allow CORS
const cors = require("cors");
// = Security MiddleWare =
// Sanitize mongo request parameters
app.use(mongoSanitize());

// Set security headers in app
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
        "http://www.w3.org",
      ],
      frameSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
        "http://www.w3.org",
      ],
      childSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
        "http://www.w3.org",
      ],
      scriptSrc: [
        "'self'",
        "unsafe-inline",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
        "http://www.w3.org",
      ],
      styleSrc: [
        "'self'",
        "unsafe-inline",
        "https://fonts.googleapis.com",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
        "http://www.w3.org",
      ],
      fontSrc: [
        "'self'",
        "unsafe-inline",
        "https://fonts.gstatic.com",
        "https://fonts.googleapis.com",
        "https://cdnjs.cloudflare.com",
        "http://www.w3.org",
      ],
      imgSrc: ["'self'", "https://*.jsdelivr.net", "http://www.w3.org"],
      baseUri: ["'self'"],
    },
  })
);

// Security against XSS
app.use(xssClean());

// Rate limiting
const limiter = expressRateLimit({
  // 10 mins
  windowMs: 10 * 60 * 1000,
  // max requests per windowMs
  max: 10000,
});
app.use(limiter);

// HTTP Param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// === MIDDLEWARE ===
// Body parser (for parsing json post)
app.use(express.json());

// HTTP Logger
app.use(morgan("tiny"));

// === ROUTES ===
const users = require("./routes/users");
app.use("/api/v1/users", users);

const accounts = require("./routes/accounts");
app.use("/api/v1/accounts", accounts);

const transactions = require("./routes/transactions");
app.use("/api/v1/transactions", transactions);

const timeSpans = require("./routes/timeSpans");
app.use("/api/v1/timespans", timeSpans);

const transactionCategories = require("./routes/transactionCategories");
app.use("/api/v1/transactioncategories", transactionCategories);

// Errorhandling middleware for routes
// NEEDS TO COME AFTER ALL OTHER MIDDLEWARE!
const errorHandler = require("./middleware/error");
app.use(errorHandler);

// PRODUCTION
// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

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
