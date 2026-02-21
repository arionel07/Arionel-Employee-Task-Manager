import type { TUserRole } from '@core/types'
import type { Context, Next } from 'hono'

export const roleMiddleware = (roles: TUserRole | TUserRole[]) => {
	const allowRoles = Array.isArray(roles) ? roles : [roles]

	return async (c: Context, next: Next) => {
		const user = c.get('user')
		if (!user) return c.json({ error: 'Unauthorized' }, 401)

		console.log('User role:', user.role)
		if (!allowRoles.includes(user.role))
			return c.json({ error: 'Forbidden' }, 403)
		await next()
	}
}
