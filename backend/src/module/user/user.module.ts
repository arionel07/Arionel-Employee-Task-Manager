import { authMiddleware } from '@core/middleware/auth.middleware'
import { Hono } from 'hono'
import { userController } from './user.controller'

export const userModule = new Hono()

userModule.use('*', authMiddleware)

userModule.route('/', userController)
