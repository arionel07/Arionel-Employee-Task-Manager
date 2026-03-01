import { logoutAtom } from '@/store/auth.store'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useSetAtom } from 'jotai'

interface IUseLogout {
	setOpen?: (tf: boolean) => void
}

export function useLogout({ setOpen }: IUseLogout) {
	const navigate = useNavigate()
	const logout = useSetAtom(logoutAtom)
	const queryClient = useQueryClient()

	const handleLogout = async () => {
		setOpen?.(false)
		await logout()
		queryClient.clear()
		navigate({ to: '/login' })
	}
	return { handleLogout }
}
