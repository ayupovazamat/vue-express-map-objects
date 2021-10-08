// импортируем контроллеры
const express = require('express')
const objectsController = require('../controllers')
const router = express.Router()

router.post('/objects', objectsController.allObjects)

module.exports = router