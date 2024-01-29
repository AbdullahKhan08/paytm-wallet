import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
})

// export const User = mongoose.model('User', userSchema)
export const User = mongoose.models.User || mongoose.model('User', userSchema)
