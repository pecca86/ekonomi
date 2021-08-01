const mongoose = require("mongoose");

const monogURI =
  process.env.NODE_ENV === "development"
    ? process.env.MONGO_DEV_URI
    : process.env.MONGO_URI;
// connect to our mongo DB
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

module.exports = connectDB;
