import { roleMiddleware } from '@core/middleware/role.middleware'
import { Hono } from 'hono'
import { ProjectService } from './project.service'

const service = new ProjectService()
export const projectController = new Hono()

// create Project
projectController.post('/', roleMiddleware('MANAGER'), async c => {
	try {
		const body = await c.req.json()

		const project = await service.createProject(c, body)

		return c.json(project)
	} catch (err: any) {
		return c.json({ error: err.message }, 400)
	}
})

// Get Project
projectController.get('/', async c => {
	try {
		const project = await service.getMyProject(c)
		return c.json(project)
	} catch (err: any) {
		return c.json({ error: err.message }, 400)
	}
})

// Add Member To Project
projectController.post('/:id/member', roleMiddleware('MANAGER'), async c => {
	try {
		const body = await c.req.json()
		const projectId = c.req.param('id')
		const addMember = await service.addMember(c, projectId, body)

		return c.json(addMember)
	} catch (err: any) {
		return c.json({ error: err.message }, 400)
	}
})

// Update Member
projectController.patch(
	'/:projectId/member/:memberId',
	roleMiddleware('MANAGER'),
	async c => {
		try {
			const body = await c.req.json()
			const projectId: string = c.req.param('projectId')!
			const memberId: string = c.req.param('memberId')!

			if (!projectId) return c.json({ error: 'projectId is required' }, 400)
			if (!memberId) return c.json({ error: 'memberId is required' }, 400)

			const update = await service.updateMember(c, projectId, memberId, body)

			return c.json(update)
		} catch (err: any) {
			return c.json({ error: err.message }, 400)
		}
	}
)

// Get All Members
projectController.get('/:id/members', async c => {
	try {
		const projectId = c.req.param('id')
		const members = await service.getProjectMembers(c, projectId)

		return c.json(members)
	} catch (err: any) {
		return c.json({ error: err.message }, 400)
	}
})
