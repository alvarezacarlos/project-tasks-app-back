const express = require('express')
const tasks = require('../controllers/tasks.controllers')

const router = express.Router()

router.get('/', tasks.getTasks)
router.get('/:taskId', tasks.getTaskById)
router.post('/', tasks.createTask)
router.delete('/:taskId', tasks.deleteTaskById)

module.exports = router