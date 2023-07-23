const app = require("./app.js");
const connectToMongo = require("./db.js");

connectToMongo();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is Running At ${port} `);
});
