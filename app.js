const express = require("express");
const { config } = require("dotenv");
const userRouter = require("./routes/Users.js");
const taskRouter = require("./routes/Tasks.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

config({
  path: "./data/config.env",
});

// Using Middleware
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Using Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("Noice");
});

module.exports = app;
