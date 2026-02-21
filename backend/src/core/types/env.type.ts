export interface IEnvConfig {
	PORT: number
	DATABASE_URL: string
	JWT_SECRET: string
	REFRESH_SECRET: string
	NODE_ENV: 'development' | 'production' | 'test'
}
