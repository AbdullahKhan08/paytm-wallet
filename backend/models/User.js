const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: { type: String },
  password: { type: String },
  fullName: { type: String },
  lastName: { type: String },
})

const User = mongoose.model('User', userSchema)

module.exports = { User }
