const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false,
  },
  roll: {
    type: String,
    required: false,
  },
  branch: {
    type: String,
    required: false,
  },
  responses: {
    type: Object,
    required: false,
  },
  isadmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isSuperAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model('users', usersSchema)