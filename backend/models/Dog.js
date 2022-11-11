const mongoose = require('mongoose')

const DogSchema = new mongoose.Schema({
    dogName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Dog', DogSchema)