import type { IProject } from '@/types/entities/project.entities'
import type { ITask } from '@/types/entities/task.entities'
import { atom } from 'jotai'
import { currentProjectAtom } from './project.store'

export const tasksAtom = atom<ITask[]>([])
export const currentTaskAtom = atom<ITask | null>(null)

export const syncTaskWithProjectAtom = atom<null, [IProject], Promise<void>>(
	null,
	async (_get, set, project) => {
		set(currentProjectAtom, project)
		set(tasksAtom, [])
	}
)
