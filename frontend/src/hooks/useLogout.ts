import { logoutAtom } from '@/store/auth.store'
import { useNavigate } from '@tanstack/react-router'
import { useSetAtom } from 'jotai'

interface IUseLogout {
	setOpen?: (tf: boolean) => void
}

export function useLogout({ setOpen }: IUseLogout) {
	const navigate = useNavigate()
	const logout = useSetAtom(logoutAtom)

	const handleLogout = async () => {
		setOpen?.(false)
		await logout()
		navigate({ to: '/login' })
	}
	return { handleLogout }
}
