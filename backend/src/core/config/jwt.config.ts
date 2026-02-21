import type { IJwtPayload } from '@core/types'
import jwt from 'jsonwebtoken'
import { env } from './env.config'

const e = env()

const JWT_SECRET = env().JWT_SECRET
const REFRESH_SECRET = env().REFRESH_SECRET

export const signAccessToken = (payload: object) => {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}

export const signRefreshToken = (payload: object) => {
	return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' })
}

export const verifyAccessToken = (token: string): IJwtPayload => {
	return jwt.verify(token, JWT_SECRET) as IJwtPayload
}
export const verifyRefreshToken = (token: string): IJwtPayload => {
	return jwt.verify(token, REFRESH_SECRET) as IJwtPayload
}
