import { LoaderScreen } from '@/components/system/LoaderScreen'
import { authLoadingAtom } from '@/store/auth.store'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, type ReactNode } from 'react'
import { fetchCurrentUserAtom } from '../store/auth.store'

export function AuthProvider({ children }: { children: ReactNode }) {
	const fetchUser = useSetAtom(fetchCurrentUserAtom)
	const loading = useAtomValue(authLoadingAtom)

	useEffect(() => {
		fetchUser()
	}, [fetchUser])

	if (loading) return <LoaderScreen />

	return <>{children}</>
}
