import type { Context } from 'hono'

interface ICookie {
	c: Context
	name: string
	value: string
	option?: { maxAge?: number; httpOnly?: boolean; path?: string }
}

export const setCookie = ({ c, name, value, option }: ICookie) => {
	const {
		maxAge = 7 * 24 * 60 * 60,
		httpOnly = true,
		path = '/'
	} = option || {}
	c.header(
		'Set-Cookie',
		`${name}=${value}; Max-Age=${maxAge}; HttpOnly=${httpOnly}; Path=${path}; SameSite=lax`
	)
}

export const clearCookie = (c: Context, name: string) => {
	c.header('Set-Cookie', `${name}=; Max-Age=0; Path=/; HttpOnly; SameSite=lax`)
}

export const getCookie = (c: Context, name: string) => {
	const cookieHeader = c.req.header('Cookie')
	if (!cookieHeader) return null

	const cookies = cookieHeader.split(';').map(c => c.trim())
	const cookie = cookies.find(c => c.startsWith(name + '='))
	if (!cookie) return null

	const value = cookie.split('=')[1]
	if (!value) return null
	return decodeURIComponent(value)
}
