import { projectService } from '@/service/project.service'
import type { IProject } from '@/types/entities/project.entities'
import { atom } from 'jotai'

export const projectsAtom = atom<IProject[]>([])
export const currentProjectAtom = atom<IProject | null>(null)

export const projectLoadingAtom = atom(false)
export const projectErrorAtom = atom<string | null>(null)

export const fetchProjectsAtom = atom<null, [], Promise<void>>(
	null,
	async (_get, set) => {
		set(projectLoadingAtom, true)
		set(projectErrorAtom, null)
		try {
			const projects = await projectService.getMyProjects()
			set(projectsAtom, projects)
		} catch (err: any) {
			set(projectErrorAtom, err.message)
		} finally {
			set(projectLoadingAtom, false)
		}
	}
)
