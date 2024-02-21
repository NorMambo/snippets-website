/**
 * A message.
 *
 * @param {string} user The logged-in user.
 * @returns {string} The message.
 */
export const welcomeMsg = (user) => {
  return `Welcome, ${user}!`
}

/**
 * A message.
 *
 * @param {string} user The registered user.
 * @returns {string} The message.
 */
export const registeredMsg = (user) => {
  return `You are registered, ${user}!`
}

/**
 * A message.
 *
 * @returns {string} The message.
 */
export const wrongCredentialsMsg = () => {
  return 'Wrong username or password!'
}

/**
 * A message.
 *
 * @returns {string} The message.
 */
export const sessionExpiredMsg = () => {
  return 'Your session expired!'
}

/**
 * A message.
 *
 * @param {string} author The mentioned author.
 * @returns {string} The message.
 */
export const snipCreatedMsg = (author) => {
  return `${author}, check out your new snippet in 'Browse'!`
}

/**
 * A message.
 *
 * @returns {string} The message.
 */
export const emptyFieldsMsg = () => {
  return 'No empty fields allowed!'
}

/**
 * A message.
 *
 * @returns {string} The message.
 */
export const snipDeletedMsg = () => {
  return 'Your deleted the snippet successfully!'
}

/**
 * A message.
 *
 * @param {string} value The value to be modified.
 * @returns {string} The message.
 */
export const modifiedValueMsg = (value) => {
  return `Modified ${value} successfully!`
}

/**
 * A message.
 *
 * @returns {string} The message.
 */
export const credentialsExistMsg = () => {
  return 'These credentials are already registered!'
}

/**
 * A message.
 *
 * @returns {string} The message (in html).
 */
export const Msg404 = () => {
  return '<h1>It seems like this resource does not exist</h1>'
}

/**
 * A message.
 *
 * @returns {string} The message (in html).
 */
export const Msg500 = () => {
  return '<h1>Ooooops... something went wrong.</h1>'
}

/**
 * A message.
 *
 * @param {number} port The port number.
 * @returns {string} The message.
 */
export const listeningMsg = (port) => {
  return `Listening at: http://localhost:${port}`
}

/**
 * A message.
 *
 * @returns {string} The message.
 */
export const dbConnectedMsg = () => {
  return 'CONNECTED TO DB'
}

/**
 * A message.
 *
 * @returns {string} The message.
 */
export const dbNotConnectedMsg = () => {
  return 'COULD NOT CONNECT TO DB: '
}
