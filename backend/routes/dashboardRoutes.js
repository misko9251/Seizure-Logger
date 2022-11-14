const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboardController')

router.get('/getDog', dashboardController.getDog)
router.get('/getFirstMedication', dashboardController.getFirstMedication)
router.get('/getAllMedication', dashboardController.getAllMedication)
router.get('/getSeizureLogs', dashboardController.getSeizureLogs)
router.post('/addFirstMedication', dashboardController.addFirstMedication)
router.post('/enterDog', dashboardController.createDog)
router.post('/addMedication', dashboardController.addMedication)
router.post('/addSeizureLog', dashboardController.addSeizureLog)

module.exports = router