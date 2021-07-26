/* Seed the database */
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// load env vars
dotenv.config({ path: "./config/config.env" });

// load models
const Account = require("./models/Account");
const Transaction = require("./models/Transaction");
const User = require("./models/User");
const TransactionCategory = require("./models/TransactionCategory");
const TimeSpan = require("./models/TimeSpan");
const { exit } = require("process");
const { createHash } = require("crypto");

// connect to db with mongoose
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  // print out to verify that we are connected
  console.log(`MongoDB connected: ${conn.connection.host}`);
};
connectDB();

// Read JSON files with account data
const transactions = JSON.parse(
  fs.readFileSync(`${__dirname}/seed_data/ekonomi_data.json`, "utf-8")
);

// Import data into db
const importData = async () => {
  try {
    // create dummy user
    const user = {
      firstname: "Janina",
      lastname: "R",
      email: "j@j.com",
      password: "janina",
    };

    await User.create(user);
    let myUser = await User.find({ email: "j@j.com" });

    // Create a dummy account
    const account = {
      name: "Janinas TEST SEEDER",
      balance: "5",
      IBAN: "FI20 43434 43434 43434 4",
      accountType: "savings",
      createdAt: "2021-06-01",
      user: myUser[0]._id,
    };
    await Account.create(account);
    let myAcc = await Account.find({ user: myUser[0]._id });

    // Create a dummy Transaction Category
    let category = await new TransactionCategory({
      transactionCategory: "Dummy Category",
    });
    await category.save();
    category = await TransactionCategory.find({
      transactionCategory: "Dummy Category",
    });

    for (let transaction of transactions) {
      transaction.user = myUser[0]._id;
      transaction.account = myAcc[0]._id;
      if (transaction.transactionType === "Spending") {
        transaction.sum = -1 * transaction.sum;
      }
      transaction.category = category[0]._id;
    }
    await Transaction.create(transactions);

    console.log("Data imported...");
    exit(1);
  } catch (err) {
    console.log("Data import failed!", err);
    exit(1);
  }
};

// Delete existing db data
const deleteData = async () => {
  try {
    await Account.deleteMany();
    await Transaction.deleteMany();
    await User.deleteMany();
    await TimeSpan.deleteMany();
    await TransactionCategory.deleteMany();
    console.log("Data destroyed!");
    exit(1);
  } catch (err) {
    console.log("Could not delete the data...");
    exit(1);
  }
};

// Add arguments when program i run
if (process.argv[2] === "-import") {
  importData();
} else if (process.argv[2] === "-delete") {
  deleteData();
} else if (process.argv[2] === null) {
  console.log("Incorrect argument, try -import or -delete.");
  exit(1);
} else {
  console.log("Incorrect argument, try -import or -delete.");
  exit(1);
}
