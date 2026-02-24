import { getAccessToken, removeFromStorage } from '@/service/auth-token.service'
import { authService } from '@/service/auth.service'
import { api } from './api'
import { errorCatch } from './error.api'

const apiClassic = api

const apiWithAuth = api

apiWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

apiWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (originalRequest.url.includes('/refresh')) {
			removeFromStorage()
			return Promise.reject(error)
		}

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await authService.getNewTokens()
				return apiWithAuth.request(originalRequest)
			} catch (error) {
				removeFromStorage()
				return Promise.reject(error)
			}
		}

		throw error
	}
)

export { apiClassic, apiWithAuth }
