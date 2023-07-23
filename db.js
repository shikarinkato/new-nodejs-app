const mongoose = require("mongoose");
const connectToMongo = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DATABASE,
    })
    .then(() => {
      console.log("Successfully Connected To Database");
    })
    .catch((err) => {
      console.log(err.message, "Failed To Connect Database");
    });
};

module.exports = connectToMongo;
