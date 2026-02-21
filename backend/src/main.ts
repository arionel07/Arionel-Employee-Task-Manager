import { env } from '@core/config/env.config'
import { serve } from '@hono/node-server'
import { createApp } from 'app.module'

const app = createApp()

const appConfig = env().PORT

serve({
	fetch: app.fetch,
	port: appConfig
})

console.log(`
🚀 Server running
🌐 http://localhost:${appConfig || 5500}
`)
