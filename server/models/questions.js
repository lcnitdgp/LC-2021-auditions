const mongoose = require('mongoose')

const questionsSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    fields: {
        type: Array,
        required: false
    },
    options: {
        type: Array,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('questions', questionsSchema)