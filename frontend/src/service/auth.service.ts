import { apiClassic, apiWithAuth } from '@/api/interceptors.api'
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
		const response = await apiClassic.post<IAuthResponse>(
			`${this.auth}/register`,
			data
		)

		if (response.data.accessToken) saveTokenToStorage(response.data.accessToken)

		return response
	}

	async login(data: IAuthLoginForm) {
		const response = await apiClassic.post<IAuthResponse>(
			`${this.auth}/login`,
			data
		)
		//console.log('authService login service:', response.data)
		if (response.data.accessToken) saveTokenToStorage(response.data.accessToken)

		return response
	}

	async logout() {
		/**
		 * Logout — deletes cookie on the backend
		 */
		const response = await apiClassic.post<boolean>(`${this.auth}/logout`)

		if (response.data) removeFromStorage()

		return response
	}

	async getNewTokens() {
		const response = await apiWithAuth.post<IAuthResponse>(
			`${this.auth}/refresh`
		)

		if (response.data.accessToken) saveTokenToStorage(response.data.accessToken)

		return response
	}
}

export const authService = new AuthService()
