const User = require("../models/UserSchema.js");
const bcrypt = require("bcryptjs");
const { sendCookie } = require("../utils/features.js");

const getAllUsers = async (req, res) => {
  try {
    let users = await User.find({});
    console.log(req.query);
    res.json({
      success: true,
      users: users,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Internal Server Error Occured");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Please  Authenticate Using Valid Details",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Please  Authenticate Using Valid Details",
      });
    }
    sendCookie(user, res, `Welcome Back, ${user.name}`, 200);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Internal Server Error Occured");
  }
};

// To Create A New Account

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Internal Server Error Occured");
  }
};

const logout = (req, res) => {
  try {
    res
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Developement" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Developement" ? false : true,
      })
      .json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Internal Server Error Occured");
  }
};

// To Get Profile Details Using Cookie And User Id

const getmyProfile = (req, res) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Internal Server Error Occured");
  }
};
module.exports = { getAllUsers, register, getmyProfile, login, logout };
