const Task = require("../models/Task");

exports.getTasks = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const q = { user: req.userId };
    if (status && ["Pending", "In Progress", "Completed"].includes(status)) q.status = status;
    if (search) q.title = { $regex: search, $options: "i" };
    const tasks = await Task.find(q).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (e) { next(e); }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, priority, deadline, status } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    const task = await Task.create({
      user: req.userId, title, description, priority, deadline, status,
    });
    res.status(201).json(task);
  } catch (e) { next(e); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (e) { next(e); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (e) { next(e); }
};
