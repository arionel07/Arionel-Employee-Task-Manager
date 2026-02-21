import { authMiddleware } from '@core/middleware/auth.middleware'
import { Hono } from 'hono'
import { projectController } from './project.controller'

export const projectModule = new Hono()

projectModule.use('*', authMiddleware)

projectModule.route('', projectController)
