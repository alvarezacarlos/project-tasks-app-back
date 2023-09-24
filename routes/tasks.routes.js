const express = require('express')
const tasks = require('../controllers/tasks.controllers')
const auth = require('../auth/auth')

const router = express.Router()

router.get('/', auth.isAuthenticated, tasks.getTasks)
router.get('/:id', auth.isAuthenticated, tasks.getTaskById)
router.post('/', auth.isAuthenticated, tasks.createTask)
router.put('/:id', auth.isAuthenticated, tasks.updateTask)
router.delete('/:id', auth.isAuthenticated, auth.isAuthorized(['admin']), tasks.deleteTaskById)

module.exports = router