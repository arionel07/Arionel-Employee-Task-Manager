import { currentUserAtom } from '@/store/auth.store'
import type { TUserRole } from '@/types/common.type'
import { getDefaultStore } from 'jotai'

export const requireRole = (roles: TUserRole[]): boolean => {
	const store = getDefaultStore()
	const user = store.get(currentUserAtom)

	if (!user) {
		window.location.href = '/login'
		return false
	}

	if (!roles.includes(user.role)) {
		window.location.href = '/'
		return false
	}

	return true
}
