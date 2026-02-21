import {
	signAccessToken,
	signRefreshToken,
	verifyRefreshToken
} from '@core/config/jwt.config'
import { comparePassword, hashPassword } from '@core/utils/hash.util'
import type { Context } from 'hono'
import { prisma } from '../../core/lib/prisma'
import type { ILoginDto, IRegisterDto } from './dto/auth.dto'

export class AuthService {
	async register(c: Context, dto: IRegisterDto) {
		const { name, email, password } = dto

		if (!name || !email || !password) throw new Error('all fields are required')

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) throw new Error('Invalid email format')

		const exists = await prisma.user.findUnique({
			where: { email: email }
		})

		if (exists) throw new Error('User already exists')

		const hashed = await hashPassword(password)

		if (password.length < 6) throw new Error('Password too short')

		const user = await prisma.user.create({
			data: {
				name: name,
				email: email,
				password: hashed,
				role: 'EMPLOYEE'
			}
		})

		const payload = { id: user.id, role: user.role, email: user.email }

		const { password: _, ...userWithoutPassword } = user

		return {
			user: userWithoutPassword,
			accessToken: signAccessToken(payload),
			refreshToken: signRefreshToken(payload)
		}
	}

	async login(c: Context, dto: ILoginDto) {
		const { email, password } = dto

		const user = await prisma.user.findUnique({
			where: { email }
		})
		if (!user) throw new Error('Invalid credentials')

		const valid = await comparePassword(password, user.password)
		if (!valid) throw new Error('Invalid credentials')

		const payload = { id: user.id, role: user.role, email: user.email }
		const { password: _, ...userWithoutPassword } = user

		return {
			user: userWithoutPassword,
			accessToken: signAccessToken(payload),
			refreshToken: signRefreshToken(payload)
		}
	}

	async refresh(token: string) {
		const payload = verifyRefreshToken(token)

		return signAccessToken({
			id: payload.id,
			role: payload.role,
			email: payload.email
		})
	}
}
