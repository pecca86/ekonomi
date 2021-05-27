const mongoose = require('mongoose');

// connect to our mongo DB
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    // print out to verify that we are connected
    console.log(`MongoDB connected: ${conn.connection.host}`)
}

module.exports = connectDB;