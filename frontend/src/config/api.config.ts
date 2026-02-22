import type { CreateAxiosDefaults } from 'axios'

const BASE_URL = 'http://localhost:5500'

export const axiosConfig: CreateAxiosDefaults = {
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true // HttpOnly cookie
}
