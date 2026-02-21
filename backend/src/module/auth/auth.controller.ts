import { clearCookie, getCookie, setCookie } from '@core/utils/cookie.util'
import { Hono } from 'hono'
import { AuthService } from './auth.service'
import type { ILoginDto } from './dto/auth.dto'

const service = new AuthService()
export const authController = new Hono()

// Register
authController.post('/register', async c => {
	try {
		const body = await c.req.json()
		const result = await service.register(c, body)

		setCookie({
			c,
			name: 'refreshToken',
			value: result.refreshToken,
			option: { maxAge: 30 * 24 * 60 * 60 }
		})

		return c.json({
			user: result.user,
			accessToken: result.accessToken
		})
	} catch (err: any) {
		return c.json({ error: err.message }, 400)
	}
})

// Login
authController.post('/login', async c => {
	try {
		const body: ILoginDto = await c.req.json()
		const result = await service.login(c, body)

		setCookie({
			c,
			name: 'refreshToken',
			value: result.refreshToken,
			option: { maxAge: 30 * 24 * 60 * 60 }
		})

		return c.json({
			user: result.user,
			accessToken: result.accessToken
		})
	} catch (err: any) {
		return c.json({ error: err.message }, 401)
	}
})

// Refresh
authController.post('/refresh', async c => {
	try {
		const token = getCookie(c, 'refreshToken')
		if (!token) return c.json({ error: 'No token' }, 401)

		const accessToken = await service.refresh(token)
		return c.json({ accessToken })
	} catch (err: any) {
		return c.json({ error: err.message }, 401)
	}
})

// Logout
authController.post('/logout', async c => {
	clearCookie(c, 'refreshToken')
	return c.json({ message: 'Logged out' })
})
