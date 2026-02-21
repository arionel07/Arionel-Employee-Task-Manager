import type { Context } from 'hono'
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

		return await prisma.task.create({
			data: {
				projectId: projectId,
				title: title,
				description: description,
				assignedToDashboardUserId: assignedToDashboardUserId,
				createdBy: managerId
			}
		})
	}

	async getTasks(c: Context, projectId: string, filter?: TFilter) {
		const prisma = this.prisma(c)
		const token = c.get('user')
		if (!token) throw new Error('Unauthorized')

		const userId = token.id

		const project = await prisma.project.findFirst({
			where: {
				id: projectId,
				OR: [{ managerId: userId }, { members: { some: { userId } } }]
			}
		})
		if (!project) throw new Error('Access denied')

		let where: any = { projectId }

		if (filter === 'pending') where.status = 'PENDING'
		if (filter === 'completed') where.status = 'COMPLETED'

		const oneWeekAgo = new Date()
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

		if (!filter || filter !== 'completed') {
			where.OR = [
				{ status: 'PENDING' },
				{ AND: [{ status: 'COMPLETED' }, { completedAt: { gte: oneWeekAgo } }] }
			]
		}

		return await prisma.task.findMany({
			where,
			orderBy: { createdAt: 'desc' },
			include: {
				dashboardUser: true,
				project: true
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
			include: { project: true }
		})

		if (!task) throw new Error('Task not found')

		const isManager = task.project.managerId === userId

		const isAssignedUser = task.assignedToDashboardUserId === userId

		if (!isManager && !isAssignedUser) throw new Error('Forbidden')

		const data: any = {}

		if (title) data.title = title
		if (description) data.description = description

		if (status) {
			data.status = status
			if (status === 'COMPLETED') data.completedAt = new Date()
			if (status === 'PENDING') data.completedAt = null
		}

		return await prisma.task.update({
			where: { id: taskId },
			data
		})
	}
}
