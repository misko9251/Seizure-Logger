const mongoose = require('mongoose')

const seizureSchema = new mongoose.Schema({
    seizureDate: {
        type: String,
        required: true
    },
    seizureLength: {
        type: String,
        required: true
    },
    seizureTime: {
        type: String,
        required: true
    },
    seizureObservation: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Seizure', seizureSchema)