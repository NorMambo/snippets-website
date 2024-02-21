import { Router } from 'express'
import { userController } from '../controllers/user_controller.js'

export const userRouter = Router()

userRouter.get('/log-reg', userController.logRegView)

userRouter.post('/login', userController.login)

userRouter.post('/register', userController.register)

userRouter.get('/logout', userController.logout)
