const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shortDateFormat = new Intl.DateTimeFormat('en-US');

  
const taskSchema = new Schema({
    title: String,
    status: String,
    desc: String,
    dev: String,
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Task = mongoose.model('Task', taskSchema, 'tasks')

module.exports = Task