import { Router } from 'express'
import { snipController } from '../controllers/snip_controller.js'

export const snipRouter = Router()

snipRouter.get('/browse', snipController.browse)

snipRouter.get('/create', snipController.createView)

snipRouter.post('/create', snipController.create)

snipRouter.get('/singleview', snipController.singleview)

snipRouter.get('/delete', snipController.delete)

snipRouter.post('/edit', snipController.edit)
