const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    role: String,
    company_id: { type: Schema.Types.ObjectId, ref: 'Company' }
})

const User = mongoose.model('User', userSchema, 'users')

module.exports = User