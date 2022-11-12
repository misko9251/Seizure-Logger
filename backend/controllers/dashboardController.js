const Dog = require('../models/Dog')
const Medication = require('../models/Medication')

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
                timesPerDay: req.body.timesPerDay
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
            const medication = await Medication.find({userId: req.body._id})
            res.status(200).json({medication: medication})
        } catch (error) {
            console.log(error)
        }
    }
}