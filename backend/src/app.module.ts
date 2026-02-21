import { withPrisma } from '@core/lib/prisma'
import { corsMiddleware } from '@core/middleware/cors.middleware'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { authModule } from 'module/auth/auth.module'
import { projectModule } from 'module/project/project.module'
import { userModule } from 'module/user/user.module'

export function createApp() {
	const app = new Hono()

	/* GLOBAL MIDDLEWARE */
	app.use('*', logger())
	app.use('*', corsMiddleware)
	app.use('*', withPrisma)

	/* HEALTH CHECK */
	app.get('/', c =>
		c.json({
			name: 'Property Api',
			status: 'running'
		})
	)

	app.use('*', async (c, next) => {
		console.log(c.req.method, c.req.path)
		await next()
	})

	/* MODULES */

	app.route('/auth', authModule)
	app.route('/user', userModule)
	app.route('/project', projectModule)

	return app
}
