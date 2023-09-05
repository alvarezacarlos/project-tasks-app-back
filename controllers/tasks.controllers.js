const Task = require("../models/Tasks");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(201).json({
      ok: true,
      message: "Request successfully completed",
      data: tasks || [],
    });
  } catch (err) {
    res.status(404).json({ ok: false, message: "Request failed", error: err });
  }
};

const getTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const taskFound = await Task.findById({ _id: taskId });
    res.status(201).json({
      ok: true,
      message: "Request successfully completed",
      data: taskFound || [],
    });
  } catch (err) {
    res.status(404).json({ ok: false, message: "Request failed", error: err });
  }
};

const createTask = async (req, res) => {
  const body = req.body;
  try {
    const newTask = new Task({
      title: body.title,
      status: 'pending',
      desc: body.desc,
      dev: body.dev,
      startDate: '2020-01-01',
      endDate: body.endDate
    });
    const taskCreated = await Task.create(newTask);
    res.status(201).json({
      ok: true,
      message: "Request successfully completed",
      data: taskCreated || [],
    });
  } catch (err) {
    res.status(404).json({ ok: false, message: "Request failed", error: err });
  }
};

const deleteTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const taskDeleted = await Task.findByIdAndDelete({ _id: taskId });
    res.status(201).json({
      ok: true,
      message: "Request successfully completed",
      data: taskDeleted || [],
    });
  } catch (err) {
    res.status(404).json({ ok: false, message: "Request failed", error: err });
  }
};

module.exports = { getTasks, getTaskById, createTask, deleteTaskById};
