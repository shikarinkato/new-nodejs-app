const app = require("./app.js");
const connectToMongo = require("./data/db.js");

connectToMongo();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is Running At ${port} `);
});
