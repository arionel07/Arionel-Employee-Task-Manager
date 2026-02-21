import { Hono } from 'hono'
import { authController } from './auth.controller'

export const authModule = new Hono()

authModule.route('/', authController)
