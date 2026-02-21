import type { Context } from 'hono'

export const errorHandler = async (err: Error, c: Context) => {
	try {
		const parsed = JSON.parse(err.message)

		return c.json(
			{
				success: false,
				type: 'validation',
				errors: parsed
			},
			400
		)
	} catch {
		return c.json(
			{
				success: false,
				message: err.message || 'Internal Server Error'
			},
			500
		)
	}
}
