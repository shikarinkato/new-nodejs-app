const Task = require("../models/TaskSchema.js");

const addaNewNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    await Task.create({
      user: req.user._id,
      title,
      description,
    });
    res
      .status(201)
      .json({ success: true, message: "Note Added", id: req.user._id });
  } catch (error) {
    res.status(500).send("Some Internal Server Occured");
  }
};

const getMyTasks = async (req, res) => {
  try {
    const id = req.user._id;
    const task = await Task.find({ user: id });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "No Task With this id" });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).send("Some Internal Server Occured");
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "No Task With this id" });
    }
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({ success: true, message: "Task Updated" });
  } catch (error) {
    res.status(500).send("Some Internal Server Occured");
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "No Task With this id" });
    }
    res.status(200).json({ success: true, message: "Task Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Internal Server Occured");
  }
};

module.exports = { addaNewNote, getMyTasks, updateTask, deleteTask };
