const mongoose = require("mongoose");
const connectToMongo = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DATABASE,
    })
    .then((c) => {
      console.log(`Successfully Connected To Database ${c.connection.host}`);
    })
    .catch((err) => {
      console.log(err.message, "Failed To Connect Database");
    });
};

module.exports = connectToMongo;
