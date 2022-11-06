const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/registerUser', authController.createUser)

module.exports = router