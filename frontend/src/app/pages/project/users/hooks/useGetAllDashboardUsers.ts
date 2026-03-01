import { projectService } from '@/service/project.service'
import { useQuery } from '@tanstack/react-query'

export function useGetAllDashboardUsers(projectId: string | null) {
	const { data: users, isLoading } = useQuery({
		queryKey: ['dashboard users', projectId],
		queryFn: () => projectService.getProjectMembers(projectId!),
		enabled: !!projectId
	})
	return { users, isLoading }
}
