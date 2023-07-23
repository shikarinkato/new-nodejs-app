const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const {
  addaNewNote,
  getMyTasks,
  updateTask,
  deleteTask,
} = require("../controllers/Task");

const router = express.Router();

router.post("/addtask", isAuthenticated, addaNewNote);
router.get("/gettask", isAuthenticated, getMyTasks);
router
  .route("/:id", isAuthenticated)
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

module.exports = router;
