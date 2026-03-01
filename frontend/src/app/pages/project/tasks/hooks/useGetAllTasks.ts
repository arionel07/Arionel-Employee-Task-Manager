import { taskService } from '@/service/task.service'
import { projectsAtom } from '@/store/project.store'
import { tasksAtom } from '@/store/task.store'
import { useQueries } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

export function useGetAllTasks() {
	const projects = useAtomValue(projectsAtom)
	const setTasks = useSetAtom(tasksAtom)

	const results = useQueries({
		queries: projects.map(project => ({
			queryKey: ['get tasks', project.id, 'all'],
			queryFn: () => taskService.getTasks(project.id, 'all'),
			enabled: !!project.id
		}))
	})

	const tasks = results.flatMap(r => r.data ?? [])
	const isLoading = results.some(r => r.isLoading)
	const error = results.find(r => r.error)?.error ?? null

	useEffect(() => {
		if (!isLoading && tasks.length > 0) {
			setTasks(tasks)
		}
	}, [isLoading])

	return { tasks, isLoading, error }
}
