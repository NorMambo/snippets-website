import { __prefix } from '../express.js'
import { snipModel } from '../models/snip_model.js'
import * as msgs from '../const/messages.js'

export const snipController = {}

/**
 * Show the snippet list.
 *
 * @param {req} req The request.
 * @param {res} res The response
 */
snipController.browse = async (req, res) => {
  const snipList = await snipModel.getSippetList()
  console.log(__prefix)
  res.render('templates/default', { body: `${__prefix}/snip/browse`, flash: res.data.flashMessage, user: req.session.user, snippets: snipList })
}

/**
 * Show the 'create snippet' page.
 *
 * @param {req} req The request.
 * @param {res} res The response.
 */
snipController.createView = async (req, res) => {
  res.render('templates/default', { body: `${__prefix}/snip/create`, flash: res.data.flashMessage, user: req.session.user })
}

/**
 * Save created snipped if user is logged in.
 *
 * @param {req} req The request.
 * @param {res} res The response.
 */
snipController.create = async (req, res) => {
  if (req.session.user) { // expired session is handled in express.js
    const description = req.body.description.trim()
    const code = req.body.code.trim()
    const progLang = req.body.progLang.trim()
    const author = req.session.user
    const tags = []
    if (code !== '' && description !== '' && progLang !== '') {
      await snipModel.save(description, code, progLang, author, tags)
      req.session.flashMessage = msgs.snipCreatedMsg(author)
      res.redirect('/')
    } else {
      req.session.flashMessage = msgs.emptyFieldsMsg()
      res.redirect('/')
    }
  }
}

/**
 * Delete the snippet if user is logged in.
 *
 * @param {req} req The request.
 * @param {res} res The response.
 */
snipController.delete = async (req, res) => {
  if (req.session.user) { // expired session is handled in express.js
    const id = req.query.id
    await snipModel.delete(id)
    req.session.flashMessage = msgs.snipDeletedMsg()
    res.redirect('/snip/browse')
  }
}

/**
 * Show the single view of a snippet.
 *
 * @param {req} req The request.
 * @param {res} res The result.
 */
snipController.singleview = async (req, res) => {
  const id = req.query.id
  const snip = await snipModel.getSingleSnip(id)
  res.render('templates/default', { body: `${__prefix}/snip/singleview`, flash: res.data.flashMessage, user: req.session.user, snippet: snip })
}

/**
 * Save the edited part of the snippet to persistance.
 *
 * @param {req} req The request.
 * @param {res} res The response.
 */
snipController.edit = async (req, res) => {
  if (req.session.user) { // expired session is handled in express.js
    let modifiedValue
    let modified = false
    if (req.body.code) {
      await snipModel.updateCode(req.body.id, req.body.code)
      modifiedValue = 'snippet'
      modified = true
    }
    if (req.body.language) {
      await snipModel.updateProgLang(req.body.id, req.body.language)
      modifiedValue = 'language'
      modified = true
    }
    if (req.body.description) {
      await snipModel.updateDescription(req.body.id, req.body.description)
      modifiedValue = 'description'
      modified = true
    }
    if (modified) {
      req.session.flashMessage = msgs.modifiedValueMsg(modifiedValue)
    } else {
      req.session.flashMessage = msgs.emptyFieldsMsg()
    }
    res.redirect('back')
  }
}
