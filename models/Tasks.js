const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: String,
    status: String,
    desc: String,
    dev: String,
    startDate: Date,
    endDate: Date
})

const Task = mongoose.model('Task', taskSchema, 'tasks')

module.exports = Task