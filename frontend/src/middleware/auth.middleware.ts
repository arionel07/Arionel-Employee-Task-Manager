import { currentUserAtom } from '@/store/auth.store'
import { redirect } from '@tanstack/react-router'
import { getDefaultStore } from 'jotai'

const store = getDefaultStore()

export function requireAuth() {
	const user = store.get(currentUserAtom)
	if (!user) throw redirect({ to: '/login' })
}

export function requireGuest() {
	const user = store.get(currentUserAtom)
	if (user) throw redirect({ to: '/' })
}
