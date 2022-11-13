const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboardController')

router.get('/getDog', dashboardController.getDog)
router.get('/getFirstMedication', dashboardController.getFirstMedication)
router.get('/getAllMedication', dashboardController.getAllMedication)
router.post('/addFirstMedication', dashboardController.addFirstMedication)
router.post('/enterDog', dashboardController.createDog)
router.post('/addMedication', dashboardController.addMedication)

module.exports = router