const Task = require("../models/Tasks");
const Company = require("../models/Company")
const User = require("../models/Users")
const moment = require('moment');

const formatMongoDate = (date) => {
  return moment.utc(date).format('YYYY-MM-DD');
};


const getTasks = async (req, res) => {
  try {
    const apiCompany = await Company.findOne({ _id: req.user.company_id });
    const apiUsers = await User.find({ company_id: apiCompany._id });

    let tasks = [];

    for (const userItem of apiUsers) {
      const userTasks = await Task.find({ user_id: userItem._id });      

      userTasks.forEach(taskItem => {
        const { _id, title, status, desc, dev, startDate, endDate } = taskItem;             

        tasks.push({
          _id,
          title,
          status,
          companyCode: apiCompany.name,
          desc,
          dev,
          startDate: formatMongoDate(startDate),
          endDate: formatMongoDate(endDate),
          createdBy: userItem.username
        });
      });
    }    

    return res.status(201).json({
      ok: true,
      message: "Request successfully completed",
      data: tasks || []
    });
  } catch (err) {
    return res.status(404).json({ ok: false, message: "Request failed", error: err });
  }
}

const getTaskById = async (req, res) => {  
  try {
    const taskFound = await Task.findById({ _id: req.params.id });
    return res.status(201).json({
      ok: true,
      message: "Request successfully completed",
      data: taskFound || [],
    });
  } catch (err) {
    return res.status(404).json({ ok: false, message: "Request failed", error: err });
  }
};


const createTask = async (req, res) => {
  const { title, desc, dev, endDate } = req.body;  

  try {
    const newTask = new Task({
      title: title,
      status: 'pending',
      desc: desc,
      dev: dev,
      startDate: '2020-01-01',
      endDate: formatMongoDate(endDate),
      user_id: req.user._id
    });
    const taskCreated = await Task.create(newTask);
    return res.status(201).json({
      ok: true,
      message: "Request successfully completed",
      data: taskCreated || [],
    });
  } catch (err) {
    return res.status(404).json({ ok: false, message: "Request failed", error: err });
  }
};


const updateTask = async (req, res) => {  
  try {            
    const taskUpdated = await Task.findOneAndUpdate({_id: req.params.id}, req.body)        
    return res.status(201).json({
      ok: true,
      message: "Request successfully completed",
      data: taskUpdated || [],
    });
  } catch (err) {
    
    return res.status(404).json({ ok: false, message: "Request failed", error: err });
  }
};


const deleteTaskById = async (req, res) => {  
  try {
    const taskDeleted = await Task.findByIdAndDelete({ _id: req.params.id });
    return res.status(201).json({
      ok: true,
      message: "Request successfully completed",
      data: taskDeleted || [],
    });
  } catch (err) {
    return res.status(404).json({ ok: false, message: "Request failed", error: err });
  }
};


module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTaskById };