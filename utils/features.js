const jwt = require("jsonwebtoken");

const sendCookie = (user, res, message, statuscode = 200) => {
  const payload = { id: user._id };
  console.log(payload)
  const jwt_key = jwt.sign(payload, process.env.JWT_SECRET);
  res
    .status(statuscode)
    .cookie("token", jwt_key, {
      httpOnly: true,
      maxage: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Developement" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Developement" ? false : true,
    })
    .json({ success: true, message, id: user._id });
};

module.exports = { sendCookie };
