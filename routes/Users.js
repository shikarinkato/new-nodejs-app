const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  register,
  login,
  getmyProfile,
  logout,
} = require("../controllers/user.js");
const { isAuthenticated } = require("../middlewares/auth.js");

const app = express();

router.get("/allusers", getAllUsers);

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/profile", isAuthenticated, getmyProfile);

module.exports = router;
