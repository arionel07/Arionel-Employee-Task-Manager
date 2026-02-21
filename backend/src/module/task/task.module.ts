import { authMiddleware } from '@core/middleware/auth.middleware'
import { Hono } from 'hono'
import { taskController } from './task.controller'

export const taskModule = new Hono()

taskModule.use('*', authMiddleware)

taskModule.route('/', taskController)
