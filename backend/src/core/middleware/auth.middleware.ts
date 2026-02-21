import { verifyAccessToken } from '@core/config/jwt.config'
import type { Context, Next } from 'hono'

export const authMiddleware = async (c: Context, next: Next) => {
	const authHeader = c.req.header('Authorization')
	if (!authHeader) return c.json({ error: 'Unauthorized' }, 401)

	const token = authHeader.split(' ')[1]
	if (!token) return c.json({ error: 'Unauthorized' }, 401)
	try {
		const decoded = verifyAccessToken(token)
		c.set('user', decoded)
		await next()
	} catch (err) {
		return c.json({ error: 'Invalid token' }, 401)
	}
}
