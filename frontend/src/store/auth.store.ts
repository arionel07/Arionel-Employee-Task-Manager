import { authService } from '@/service/auth.service'
import { userService } from '@/service/user.service'
import type { IUser } from '@/types/entities/user.entities'
import { atom } from 'jotai'
import { toast } from 'sonner'
import { currentProjectAtom, projectsAtom } from './project.store'
import { tasksAtom } from './task.store'

export const currentUserAtom = atom<IUser | null>(null)

export const isAuthAtom = atom<boolean>(get => !!get(currentUserAtom))
export const authLoadingAtom = atom(true)

export const fetchCurrentUserAtom = atom<null, [], Promise<void>>(
	null,
	async (_get, set) => {
		set(authLoadingAtom, true)
		try {
			const res = await userService.getProfile()
			set(currentUserAtom, res.data)
		} catch (err) {
			set(currentUserAtom, null)
		} finally {
			set(authLoadingAtom, false)
		}
	}
)

export const logoutAtom = atom(null, async (_get, set) => {
	try {
		await authService.logout?.()
	} finally {
		set(currentUserAtom, null)
		set(projectsAtom, [])
		set(currentProjectAtom, null)
		set(tasksAtom, [])
		toast.success('Logged out successfully')
	}
})
