import { roleMiddleware } from '@core/middleware/role.middleware'
import { Hono } from 'hono'
import { UserService } from './user.service'

const service = new UserService()
export const userController = new Hono()

// Get My Profile
userController.get('/me', async c => {
	try {
		const profile = await service.getMyProfile(c)
		return c.json(profile)
	} catch (err: any) {
		return c.json({ error: err.message }, 404)
	}
})

// Get all users
userController.get('/', roleMiddleware(['MANAGER', 'EMPLOYEE']), async c => {
	try {
		const users = await service.getAllUsers()
		return c.json(users)
	} catch (err: any) {
		return c.json({ error: err.message }, 404)
	}
})

// Get user by id
userController.get('/:id', async c => {
	try {
		const id = c.req.param('id')
		if (!id) return c.json({ error: 'User ID is required' }, 400)

		const profile = await service.getUserById(id)
		return c.json(profile)
	} catch (err: any) {
		return c.json({ error: err.message }, 404)
	}
})

// Update My Profile
userController.patch('/me', async c => {
	try {
		const body = await c.req.json()
		if (!body || Object.keys(body).length === 0)
			return c.json({ error: 'Nothing to update' }, 400)

		const profile = await service.updateMyProfile(c, body)
		return c.json(profile)
	} catch (err: any) {
		return c.json({ error: err.message }, 404)
	}
})
