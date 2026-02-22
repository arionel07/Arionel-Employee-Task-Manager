import { taskService } from '@/service/task.service'
import type { ITask } from '@/types/entities/task.entities'
import { atom } from 'jotai'
import { currentProjectAtom } from './project.store'

export const tasksAtom = atom<ITask[]>([])
export const currentTaskAtom = atom<ITask | null>(null)

export const tasksLoadingAtom = atom(false)
export const tasksErrorAtom = atom<string | null>(null)

export const fetchTaskAtom = atom<null, [], Promise<void>>(
	null,
	async (_get, set) => {
		const project = _get(currentProjectAtom)
		if (!project) return

		set(tasksLoadingAtom, true)
		set(tasksErrorAtom, null)
		try {
			const tasks = await taskService.getTasks(project.id, 'all')
			set(tasksAtom, tasks)
		} catch (err: any) {
			set(tasksErrorAtom, err.message)
		} finally {
			set(tasksLoadingAtom, false)
		}
	}
)

export const syncTaskWithProjectAtom = atom(
	get => get(currentProjectAtom),
	(_get, set) => {
		set(tasksAtom, [])
	}
)
