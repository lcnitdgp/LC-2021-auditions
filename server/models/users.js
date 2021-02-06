const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    responses: {
        type: Array,
        required: false
    },
    isadmin: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('users', usersSchema)