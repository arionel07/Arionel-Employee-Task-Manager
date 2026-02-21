import { env } from '@core/config/env.config'
import { PrismaPg } from '@prisma/adapter-pg'
import type { Context, Next } from 'hono'
import { PrismaClient } from '../../../prisma/generated/prisma/client'

const databaseUrl = env().DATABASE_URL

if (!databaseUrl) {
	throw new Error('DATABASE_URL is not defined in environment variables')
}

const adapter = new PrismaPg({
	connectionString: databaseUrl
})

export const prisma = new PrismaClient({
	adapter
})

process.on('beforeExit', async () => {
	await prisma.$disconnect()
})

export async function withPrisma(c: Context, next: Next) {
	if (!c.get('prisma')) {
		c.set('prisma', prisma)
	}
	await next()
}
