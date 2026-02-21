import { roleMiddleware } from '@core/middleware/role.middleware'
import { Hono } from 'hono'
import { TaskService } from './task.service'

const service = new TaskService()
export const taskController = new Hono()

//create task
taskController.post('/', roleMiddleware('MANAGER'), async c => {
	try {
		const body = await c.req.json()
		const createTask = await service.createTask(c, body)

		return c.json(createTask)
	} catch (err: any) {
		return c.json({ error: err.message }, 400)
	}
})

//get task
taskController.get('/project/:projectId', async c => {
	try {
		const filter = c.req.query('filter') as
			| 'all'
			| 'pending'
			| 'completed'
			| undefined
		const projectId = c.req.param('projectId')
		const getTask = await service.getTasks(c, projectId, filter)

		return c.json(getTask)
	} catch (err: any) {
		return c.json({ error: err.message }, 400)
	}
})

//update task
taskController.patch('/:taskId', async c => {
	try {
		const body = await c.req.json()
		const taskId = c.req.param('taskId')
		const updateTask = await service.updateTask(c, taskId, body)

		return c.json(updateTask)
	} catch (err: any) {
		return c.json({ error: err.message }, 400)
	}
})
