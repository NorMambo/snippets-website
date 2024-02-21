import { Router } from 'express'
import { snipController } from '../controllers/snip_controller.js'
import { sessionValid } from '../controllers/sess_controller.js'

export const snipRouter = Router()

snipRouter.get('/browse', snipController.browse)

snipRouter.get('/create', sessionValid, snipController.createView)

snipRouter.post('/create', sessionValid, snipController.create)

snipRouter.get('/singleview', snipController.singleview)

snipRouter.get('/delete', sessionValid, snipController.delete)

snipRouter.post('/edit', sessionValid, snipController.edit)
