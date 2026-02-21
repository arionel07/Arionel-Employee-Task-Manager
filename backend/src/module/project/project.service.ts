//import { prisma } from '@core/lib/prisma'
import type { Context } from 'hono'
import type {
	IAddMemberDto,
	ICreateProjectDto,
	IUpdateMemberDto
} from './dto/project.dto'

export class ProjectService {
	private prisma(c: Context) {
		return c.get('prisma')
	}

	async createProject(c: Context, dto: ICreateProjectDto) {
		const prisma = this.prisma(c)
		const { name, description } = dto

		const token = c.get('user')
		if (!token) throw new Error('Unauthorized')

		if (!name || name.length < 2) throw new Error('Project name too short')

		const project = await prisma.project.create({
			data: {
				managerId: token.id,
				name: name,
				description: description
			}
		})

		const user = await prisma.user.findUnique({
			where: { id: token.id }
		})

		await prisma.dashboardUser.create({
			data: {
				projectId: project.id,
				userId: token.id,
				managerId: token.id,
				role: 'MANAGER',
				name: user.name,
				nickname: token.nickname || null,
				avatar: token.avatar || null
			}
		})

		return project
	}

	async getMyProject(c: Context) {
		const prisma = this.prisma(c)
		const token = c.get('user')
		if (!token) throw new Error('Unauthorized')

		const userId = token.id

		return await prisma.project.findMany({
			where: {
				OR: [
					{ managerId: userId },
					{
						dashboardUsers: {
							some: { userId }
						}
					}
				]
			},
			include: {
				manager: {
					select: {
						id: true,
						name: true,
						email: true
					}
				},
				dashboardUsers: {
					select: {
						id: true,
						name: true,
						nickname: true,
						avatar: true,
						user: {
							select: {
								id: true,
								name: true,
								email: true
							}
						},
						role: true
					}
				}
			}
		})
	}

	async addMember(c: Context, projectId: string, dto: IAddMemberDto) {
		const prisma = this.prisma(c)
		const token = c.get('user')
		if (!token) throw new Error('Unauthorized')

		const { role, avatar, email, name, nickname, userId } = dto
		const managerId = token.id

		const project = await prisma.project.findUnique({
			where: { id: projectId }
		})

		if (!project) throw new Error('Project not found')
		if (project.managerId !== managerId) throw new Error('Forbidden')

		let user

		if (userId) {
			user = await prisma.user.findUnique({ where: { id: userId } })
		} else if (email) {
			user = await prisma.user.findUnique({ where: { email } })
		} else {
			throw new Error('userId or email required')
		}

		if (!user) throw new Error('User not found')

		const exists = await prisma.dashboardUser.findFirst({
			where: {
				projectId,
				userId: user.id
			}
		})

		if (exists) throw new Error('User already in project')

		return await prisma.dashboardUser.create({
			data: {
				projectId,
				userId: user.id,
				managerId,
				email: email,
				name: name,
				nickname: nickname,
				avatar: avatar,
				role: role || 'EMPLOYEE'
			}
		})
	}

	async updateMember(
		c: Context,
		projectId: string,
		memberId: string,
		dto: IUpdateMemberDto
	) {
		const prisma = this.prisma(c)
		const token = c.get('user')
		if (!token) throw new Error('Unauthorized')

		const { avatar, name, nickname } = dto
		const managerId = token.id

		const project = await prisma.project.findUnique({
			where: { id: projectId }
		})

		if (!project) throw new Error('Project not found')
		if (project.managerId !== managerId) throw new Error('Forbidden')

		const member = await prisma.dashboardUser.findUnique({
			where: { id: memberId }
		})
		if (!member) throw new Error('Member not found')
		if (member.projectId !== projectId)
			throw new Error('Member does not belong to this project')

		return await prisma.dashboardUser.update({
			where: { id: memberId },
			data: {
				name: name,
				nickname: nickname,
				avatar: avatar
			}
		})
	}

	async getProjectMembers(c: Context, projectId: string) {
		const prisma = this.prisma(c)
		const token = c.get('user')
		if (!token) throw new Error('Unauthorized')

		const userId = token.id

		// Проверяем, что пользователь имеет доступ к проекту
		const project = await prisma.project.findFirst({
			where: {
				id: projectId,
				OR: [{ managerId: userId }, { dashboardUsers: { some: { userId } } }]
			}
		})

		if (!project) throw new Error('Access denied')

		// Получаем всех участников проекта
		const members = await prisma.dashboardUser.findMany({
			where: { projectId },
			select: {
				id: true,
				name: true,
				nickname: true,
				avatar: true,
				role: true
			}
		})

		return members
	}
}
