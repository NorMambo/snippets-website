import mongoose from 'mongoose'
import { Schema } from './db_conn.js'

export const userModel = {} // exporting the model through which we can interact with the userDB

// Defines what stored items should look like (should have a name, used status, type)
const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  date: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)

/**
 * Add new user.
 *
 * @param {string} username The username.
 * @param {string} email The email address.
 * @param {string} password The password.
 */
userModel.register = async (username, email, password) => {
  const user = new User({
    username,
    email,
    password
  })
  try {
    await user.save()
  } catch (err) {
    console.log('Could not store new user.')
  }
}

/**
 * Find a user by username.
 *
 * @param {string} username The username.
 * @returns {object | null} The user or null.
 */
userModel.findUser = async (username) => {
  return await User.findOne(
    {
      username
    }
  )
}

/**
 * List all users.
 *
 * @returns {Array} array with users.
 */
userModel.getUserList = async () => {
  const users = await User.find()
  return users
}
