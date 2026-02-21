import type { IEnvConfig } from '@core/types/env.type'

export const env = (): IEnvConfig => {
	const required = ['PORT', 'DATABASE_URL', 'JWT_SECRET', 'REFRESH_SECRET']

	for (const key of required) {
		if (!process.env[key]) {
			throw new Error(`Missing env variable: ${key}`)
		}
	}

	return {
		PORT: process.env.PORT!,
		DATABASE_URL: process.env.DATABASE_URL!,
		JWT_SECRET: process.env.JWT_SECRET!,
		REFRESH_SECRET: process.env.REFRESH_SECRET!,
		NODE_ENV: (process.env.NODE_ENV as any) || 'development'
	}
}
