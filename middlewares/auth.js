const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema.js");

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(400)
      .json({ succes: false, message: "Log in Or register First" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};

module.exports = { isAuthenticated };
