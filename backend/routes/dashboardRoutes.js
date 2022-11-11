const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboardController')

router.post('/enterDog', dashboardController.createDog)
router.get('/getDog', dashboardController.getDog)
router.post('/addFirstMedication', dashboardController.addFirstMedication)
router.get('/getFirstMedication', dashboardController.getFirstMedication)

module.exports = router