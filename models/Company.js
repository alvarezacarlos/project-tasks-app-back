const mongoose = require('mongoose')

const Schema = mongoose.Schema

const companySchema = new Schema({
    name: String,
    code: String
})

const Company =  mongoose.model('Company', companySchema, 'companies')

module.exports = Company