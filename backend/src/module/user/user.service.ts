import {
	userAllSelect,
	userDashboardSelect,
	userSelect,
	userTaskSelect
} from '@core/config/prismaSelect/user/userSelect.config'
import { prisma } from '@core/lib/prisma'
import type { Context } from 'hono'
import type { IUpdateUserDto } from './dto/user.dto'

export class UserService {
	async getMyProfile(c: Context) {
		const tokenPayload = c.get('user')
		if (!tokenPayload) throw new Error('Unauthorized')

		const user = await prisma.user.findUnique({
			where: { id: tokenPayload.id },
			select: {
				...userSelect,
				tasks: userTaskSelect,
				dashboardUsers: userDashboardSelect
			}
		})
		if (!user) throw new Error('User not found')
		return user
	}

	async getAllUsers() {
		const users = await prisma.user.findMany({
			select: { ...userAllSelect }
		})

		if (!users || users.length === 0) throw new Error('No users found')

		return users
	}
	async getUserById(id: string) {
		const user = await prisma.user.findUnique({
			where: { id },
			select: {
				...userAllSelect,
				tasks: userTaskSelect,
				dashboardUsers: userDashboardSelect
			}
		})

		if (!user) throw new Error('User not found')

		return user
	}
	async updateMyProfile(c: Context, dto: IUpdateUserDto) {
		if (!dto.name && !dto.nickname && !dto.avatar)
			throw new Error('Nothing to update')

		const token = c.get('user')
		if (!token) throw new Error('Unauthorized')

		const user = await prisma.user.update({
			where: { id: token.id },
			data: dto,
			select: {
				...userSelect
			}
		})
		if (!user) throw new Error('User not found')

		return user
	}
}
