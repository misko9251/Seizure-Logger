const Dog = require('../models/Dog')
const Medication = require('../models/Medication')
const Seizure = require('../models/Seizure')

module.exports = {
    createDog: async (req, res) => {
        try {
            const dog = await Dog.create({
                dogName: req.body.dogName,
                userId: req.user._id
            })
            res.status(200).json({dog: dog})
        } catch (error) {
            console.log(error)
        }
    },
    getDog: async (req, res) => {
        try {
            const dog = await Dog.find({userId: req.user._id})
            res.status(200).json({dog: dog})
        } catch (error) {
            console.log(error)
        }
    },
    addFirstMedication: async (req, res) => {
        try {
            const medication = await Medication.create({
                medicationName: req.body.medicationName,
                dosage: req.body.dosage,
                userId: req.user._id,
                timesPerDay: req.body.timesPerDay,
                prescriptionDate: req.body.prescriptionDate
            })
            res.status(200).json({medication: medication})
        } catch (error) {
            console.log(error)
        }
    },
    addMedication: async (req, res) =>{
        try {
            const medication = await Medication.create({
                medicationName: req.body.medicationName,
                dosage: req.body.dosage,
                userId: req.user._id,
                timesPerDay: req.body.timesPerDay,
                prescriptionDate: req.body.prescriptionDate
            })
            res.status(200).json({medication: medication})
        } catch (error) {
            console.log(error)
        }
    },
    getFirstMedication: async (req, res) => {
        try {
            const medication = await Medication.find({userId: req.user._id})
            res.status(200).json({medication: medication})
        } catch (error) {
            console.log(error)
        }
    },
    getAllMedication: async (req, res) => {
        try {
            const medication = await Medication.find({userId: req.user._id})
            res.status(200).json({medication: medication})
        } catch (error) {
            console.log(error)
        }
    },
    addSeizureLog: async (req, res) => {
        try {
            const seizure = await Seizure.create({
                userId: req.user._id,
                seizureDate: req.body.seizureDate,
                seizureLength: req.body.seizureLength,
                seizureTime: req.body.seizureTime,
                seizureObservation: req.body.seizureObservation
            })
        } catch (error) {
            
        }
    },
    getSeizureLogs: async (req, res) => {
        try {
            const seizures = await Seizure.find({userId: req.user._id})
            res.status(200).json({seizures: seizures})
        } catch (error) {
            console.log(error)
        }
    }
}