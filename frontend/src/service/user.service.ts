import { apiWithAuth } from '@/api/interceptors.api'
import { ROUTES } from '@/constants/route.constant'
import type { TApiSuccess } from '@/types/api/response.api'
import type { IUpdateUserDto } from '@/types/dto/user.dto'
import type { IUser } from '@/types/entities/user.entities'

class UserService {
	async getProfile() {
		const response = await apiWithAuth.get<TApiSuccess<IUser>>(
			`${ROUTES.USER}/me`
		)
		return response
	}
	async updateMyProfile(data: IUpdateUserDto) {
		const response = await apiWithAuth.patch<TApiSuccess<IUser>>(
			`${ROUTES.USER}/me`,
			data
		)
		return response
	}
	async getAllUsers() {
		const response = await apiWithAuth.get<TApiSuccess<IUser[]>>(
			`${ROUTES.USER}`
		)
		return response
	}
	async getUserById(id: string) {
		const response = await apiWithAuth.get<TApiSuccess<IUser>>(
			`${ROUTES.USER}/${id}`
		)
		return response
	}
}

export const userService = new UserService()
