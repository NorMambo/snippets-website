// https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { config } from 'dotenv'
import mongoose from 'mongoose'
import * as msgs from '../const/messages.js'

config() // read the .env file and sets the environment variables using the config

// mongoose.Promise: Mongoose has its own promise implementation that it uses internally for certain operations.
// However, you can configure Mongoose to use a different promise library or the native JavaScript Promise.
// global.Promise: This sets the promise library for Mongoose to the global Promise object.
// The global object in Node.js is equivalent to the window object in browsers.
// By setting it to global.Promise, you're using the native JavaScript Promise implementation
mongoose.Promise = global.Promise

mongoose.set('strictQuery', false) // fix to prepare for 7.0 and avoid warning

/**
 * Exporting the function to connect to database.
 */
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log(msgs.dbConnectedMsg())
  } catch (err) {
    console.error(msgs.dbNotConnectedMsg(), err.message)
  }
}

// Create a database schema
export const Schema = mongoose.Schema
