import {
	authLoadingAtom,
	currentUserAtom,
	fetchCurrentUserAtom,
	logoutAtom
} from '@/store/auth.store'
import { useAtomValue, useSetAtom } from 'jotai'

export function useAuth() {
	const user = useAtomValue(currentUserAtom)
	const loading = useAtomValue(authLoadingAtom)
	const fetchUser = useSetAtom(fetchCurrentUserAtom)
	const logout = useAtomValue(logoutAtom)

	return {
		logout,
		user,
		loading,
		fetchUser,
		isAuth: !!user
	}
}
