const express = require('express')
const companies = require('../controllers/companies.controllers')
const auth = require('../auth/auth')

const router = express.Router()

router.post('/', companies.createCompany)

module.exports = router