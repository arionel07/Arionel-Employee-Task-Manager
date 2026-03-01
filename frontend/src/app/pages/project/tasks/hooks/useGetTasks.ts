import { taskService } from '@/service/task.service'
import { useQuery } from '@tanstack/react-query'

export function useGetTasks(
	projectId: string,
	filter: 'active' | 'completed' | 'all'
) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['get tasks', projectId, filter],
		queryFn: () => taskService.getTasks(projectId, filter),
		enabled: !!projectId
	})

	return { data, isLoading, error }
}
