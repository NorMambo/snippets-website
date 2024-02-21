import mongoose from 'mongoose'
import { Schema } from './db_conn.js'

export const snipModel = {} // exporting the model through which we can interact with the userDB

// Defines what stored items should look like (should have a name, used status, type)
const snippetSchema = new Schema({
  description: String,
  code: String,
  progLang: String,
  author: String,
  tags: Array,
  date: { type: Date, default: Date.now }
})

const Snippet = mongoose.model('Snippet', snippetSchema)

/**
 * Save new snippet to DB.
 *
 * @param {string} description The description.
 * @param {string} code The code snippet.
 * @param {string} progLang The programming language.
 * @param {string} author The username (or author).
 * @param {Array} tags The tags (not implemented).
 */
snipModel.save = async (description, code, progLang, author, tags) => {
  const snippet = new Snippet({
    description,
    code,
    progLang,
    author,
    tags
  })
  try {
    await snippet.save()
  } catch (err) {
    console.log('Could not store new user.')
  }
}

/**
 * List all snippets from DB.
 *
 * @returns {Array} The array with snippets.
 */
snipModel.getSippetList = async () => {
  const snippets = await Snippet.find()
  return snippets
}

/**
 * Get a single snippet by snippet ID.
 *
 * @param {string} id The snippet ID.
 * @returns {object} The snippet.
 */
snipModel.getSingleSnip = async (id) => {
  const snip = await Snippet.findOne({ _id: id })
  return snip
}

/**
 * Delete a snippet from DB.
 *
 * @param {string} id The ID of the snippet to be deleted.
 */
snipModel.delete = async (id) => {
  await Snippet.deleteOne({ _id: id })
}

/**
 * Update the programming language of the DB entry.
 *
 * @param {string} id The snippet ID.
 * @param {string} progLang The snippet programming language.
 */
snipModel.updateProgLang = async (id, progLang) => {
  await Snippet.findByIdAndUpdate(id, { progLang })
}

/**
 * Update the description of the DB entry.
 *
 * @param {string} id The snippet ID.
 * @param {string} description The description,
 */
snipModel.updateDescription = async (id, description) => {
  await Snippet.findByIdAndUpdate(id, { description })
}

/**
 * Update the code of the DB entry.
 *
 * @param {string} id The snippet ID.
 * @param {string} code The source code.
 */
snipModel.updateCode = async (id, code) => {
  try {
    await Snippet.findByIdAndUpdate(id, { code })
  } catch (err) {
    console.log(err)
  }
}
