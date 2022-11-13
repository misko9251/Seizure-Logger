const mongoose = require('mongoose')

const MedicationSchema = new mongoose.Schema({
    medicationName: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    prescriptionDate: {
        type: Date,
        required: true
    },
    timesPerDay: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Medication', MedicationSchema)