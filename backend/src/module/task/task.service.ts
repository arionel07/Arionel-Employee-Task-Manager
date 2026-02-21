import type { Context } from 'hono'
import type {
	TaskUpdateInput,
	TaskWhereInput
} from '../../../prisma/generated/prisma/models'
import type { ICreateTaskDto, IUpdateTaskDto, TFilter } from './dto/task.dto'

export class TaskService {
	private prisma(c: Context) {
		return c.get('prisma')
	}

	async createTask(c: Context, dto: ICreateTaskDto) {
		const prisma = this.prisma(c)
		const token = c.get('user')
		if (!token) throw new Error('Unauthorized')

		const { assignedToDashboardUserId, projectId, title, description } = dto
		const managerId = token.id

		const project = await prisma.project.findUnique({
			where: { id: projectId }
		})

		if (!project) throw new Error('Project not found')
		if (project.managerId !== managerId) throw new Error('Forbidden')

		const member = await prisma.dashboardUser.findUnique({
			where: { id: assignedToDashboardUserId }
		})

		if (!member || member.projectId !== projectId)
			throw new Error('Assigned user is not part of this project')

		if (!title || title.length < 2) throw new Error('Title too short')
		if (description && description.length > 5000)
			throw new Error('Description too long')

		const task = await prisma.task.create({
			data: {
				projectId,
				title,
				description,
				assignedToDashboardUserId,
				createdBy: managerId
			}
		})

		return task
	}

	async getTasks(c: Context, projectId: string, filter?: TFilter) {
		const prisma = this.prisma(c)
		const token = c.get('user')
		if (!token) throw new Error('Unauthorized')

		const userId = token.id

		const project = await prisma.project.findFirst({
			where: {
				id: projectId,
				OR: [{ managerId: userId }, { dashboardUsers: { some: { userId } } }]
			}
		})
		if (!project) throw new Error('Access denied')

		let where: TaskWhereInput = { projectId }

		if (filter === 'pending') {
			where.status = 'PENDING'
		} else if (filter === 'completed') {
			where.status = 'COMPLETED'
		} else {
			const oneWeekAgo = new Date()
			oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

			where.OR = [
				{ status: 'PENDING' },
				{
					AND: [{ status: 'COMPLETED' }, { completedAt: { gte: oneWeekAgo } }]
				}
			]
		}

		return await prisma.task.findMany({
			where,
			orderBy: { createdAt: 'desc' },
			include: {
				dashboardUser: {
					select: { id: true, name: true, avatar: true }
				}
			}
		})
	}

	async updateTask(c: Context, taskId: string, dto: IUpdateTaskDto) {
		const prisma = this.prisma(c)
		const token = c.get('user')
		if (!token) throw new Error('Unauthorized')

		const { description, status, title } = dto
		const userId = token.id

		const task = await prisma.task.findUnique({
			where: { id: taskId },
			include: {
				project: true,
				dashboardUser: true
			}
		})

		if (!task) throw new Error('Task not found')

		const isManager = task.project.managerId === userId

		const isAssignedUser = task.dashboardUser?.userId === userId

		if (!isManager && !isAssignedUser) throw new Error('Forbidden')

		const data: TaskUpdateInput = {}

		if (title !== undefined) data.title = title
		if (description !== undefined) data.description = description

		if (status !== undefined) {
			if (status !== 'PENDING' && status !== 'COMPLETED')
				throw new Error('Invalid status value')

			data.status = status
			data.completedAt = status === 'COMPLETED' ? new Date() : null
		}

		return await prisma.task.update({
			where: { id: taskId },
			data
		})
	}
}
