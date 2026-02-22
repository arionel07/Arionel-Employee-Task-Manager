import { api } from '@/api/api'
import { ROUTES } from '@/constants/route.constant'
import type {
	IAuthLoginForm,
	IAuthRegisterForm,
	IAuthResponse
} from '@/types/entities/auth.entities'
import { removeFromStorage, saveTokenToStorage } from './auth-token.service'

class AuthService {
	auth = ROUTES.AUTH
	async register(data: IAuthRegisterForm) {
		const response = await api.post<IAuthResponse>(
			`${this.auth}/register`,
			data
		)

		if (response.data.accessToken) saveTokenToStorage(response.data.accessToken)

		return response
	}

	async login(data: IAuthLoginForm) {
		const response = await api.post<IAuthResponse>(`${this.auth}/login`, data)

		if (response.data.accessToken) saveTokenToStorage(response.data.accessToken)

		return response
	}

	async logout() {
		/**
		 * Logout — deletes cookie on the backend
		 */
		const response = await api.post<boolean>(`${this.auth}/logout`)

		if (response.data) removeFromStorage()

		return response
	}

	async refresh() {
		return await api.post<IAuthResponse>(`${this.auth}/refresh`)
	}
}

export const authService = new AuthService()
