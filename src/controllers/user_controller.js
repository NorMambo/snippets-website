import { __prefix } from '../express.js'
import { userModel } from '../models/user_model.js'
import * as msgs from '../const/messages.js'
import bcrypt from 'bcrypt'

export const userController = {}

/**
 * Show the login and register interface.
 *
 * @param {req} req The request.
 * @param {res} res The response.
 */
userController.logRegView = (req, res) => {
  res.render('templates/default', { body: `${__prefix}/user/log-reg`, flash: res.data.flashMessage, user: req.session.user })
}

/**
 * Log in the user and perform authentication process.
 *
 * @param {req} req The request.
 * @param {res} res The response.
 */
userController.login = async (req, res) => {
  const username = req.body.logUsername
  const password = req.body.logPassword
  const user = await userModel.findUser(username)
  if (user) {
    const success = await bcrypt.compare(password, user.password)
    if (success) {
      req.session.user = username
      req.session.flashMessage = msgs.welcomeMsg(username)
      res.redirect('/')
    } else {
      req.session.flashMessage = msgs.wrongCredentialsMsg()
      res.redirect('/')
    }
  } else {
    req.session.flashMessage = msgs.wrongCredentialsMsg()
    res.redirect('/')
  }
}

/**
 * Perform the registration checks and register the user.
 *
 * @param {req} req The request.
 * @param {res} res The response.
 */
userController.register = async (req, res) => {
  const username = req.body.regUsername.replace('\'', '')
  const email = req.body.regEmail
  const password = req.body.regPassword

  if (await regValidationOk(username, email)) {
    await userModel.register(username, email, await getHashedPw(password))
    req.session.user = username
    req.session.flashMessage = msgs.registeredMsg(username)
    res.redirect('/')
  } else {
    req.session.flashMessage = msgs.credentialsExistMsg()
    res.redirect('/')
  }
}

/**
 * Log the user out.
 *
 * @param {req} req The request.
 * @param {res} res The response.
 */
userController.logout = async (req, res) => {
  req.session.user = null
  res.redirect('/')
}

/**
 * The validation step for registration.
 *
 * @param {string} username The provided username.
 * @param {string} email The provided email.
 * @returns {boolean} True if ok, false if not ok.
 */
async function regValidationOk (username, email) {
  const list = await userModel.getUserList()
  let counter = 0
  list.forEach((entry) => {
    if (entry.username === username || entry.email === email) {
      counter++
    }
  })
  if (counter > 0) {
    return false
  } else {
    return true
  }
}

// /**
//  * Check if user is loggedin. // the structure of the website doesn't require this message.. I handle it with a session expired notification
//  *
//  * @param {object} req Express request object.
//  * @param {object} res Express response object.
//  */
// userController.isLoggedin = (req, res, next) => {
//   if (req.session.user) {
//     next()
//   } else {
//     res.sendStatus(403)
//   }
// }

/**
 * Hashing the password.
 *
 * @param {string} pw The provided password.
 * @returns {string} The hashed password.
 */
async function getHashedPw (pw) {
  const saltRounds = 10
  return await bcrypt.hash(pw, saltRounds)
}
