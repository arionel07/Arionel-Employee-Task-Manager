import {
	getAccessToken,
	removeFromStorage,
	saveTokenToStorage
} from '@/service/auth-token.service'
import { authService } from '@/service/auth.service'
import { api } from './api'

let isRefreshing = false
let queque: ((token: string) => void)[] = []

const resolveQueue = (token: string) => {
	queque.forEach(cb => cb(token))
	queque = []
}

api.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	config.headers = config.headers ?? {}

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

api.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (!originalRequest) return Promise.reject(error)

		if (originalRequest.url?.includes('/refresh')) {
			removeFromStorage()
			window.location.href = '/login'
			return Promise.reject(error)
		}

		if (error?.response?.status === 401 && !originalRequest._isRetry) {
			if (isRefreshing) {
				return new Promise(resolve => {
					queque.push((token: string) => {
						originalRequest.headers.Authorization = `Bearer ${token}`
						resolve(api(originalRequest))
					})
				})
			}
			originalRequest._isRetry = true
			isRefreshing = true
			try {
				const res = await authService.refresh()
				const saveAccess = res.data.accessToken

				if (!saveAccess) throw new Error('No access token')

				saveTokenToStorage(saveAccess)
				resolveQueue(saveAccess)

				originalRequest.headers.Authorization = `Bearer ${saveAccess}`
				return api(originalRequest)
			} catch (error) {
				removeFromStorage()
				window.location.href = '/login'
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	}
)
