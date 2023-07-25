const jwt = require("jsonwebtoken");

const sendCookie = (user, req, res, message, statuscode = 200) => {
  const payload = { id: user.id };
  console.log(payload);
  const jwt_key = jwt.sign(payload, process.env.JWT_SECRET);
  req.cookies
  res
    .status(statuscode)
    .cookie("token", jwt_key, {
      httpOnly: true,
      maxage: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({ success: true, message, id: user.id });
};

module.exports = { sendCookie };
