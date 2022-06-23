const mongoose = require("mongoose");

const connectDB = async (url) => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true });
        console.log("Database connected successfully!");
    } catch (error) {
        console.log("Error while connecting to the database", error);
    }
};

module.exports = connectDB;
