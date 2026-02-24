import { authService } from '@/service/auth.service'
import { currentUserAtom } from '@/store/auth.store'
import type {
	IAuthLoginForm,
	IAuthRegisterForm
} from '@/types/entities/auth.entities'
import { useNavigate } from '@tanstack/react-router'
import { useSetAtom } from 'jotai'
import { toast } from 'sonner'

export function useAuthAction() {
	const navigate = useNavigate()
	const setUser = useSetAtom(currentUserAtom)
	//const fetchUser = useSetAtom(fetchCurrentUserAtom)

	const login = async (data: IAuthLoginForm) => {
		const res = await authService.login(data)
		setUser(res.data?.user)
		//saveTokenToStorage(res.data?.accessToken)
		//await fetchUser()
		toast.success('Successfully login!')
		navigate({ to: '/' })
	}

	const createAccount = async (data: IAuthRegisterForm) => {
		const res = await authService.register(data)
		setUser(res.data?.user)
		toast.success('Successfully registered!')
		navigate({ to: '/' })
	}

	return { login, createAccount }
}
