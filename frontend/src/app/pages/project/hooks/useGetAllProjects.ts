import { projectService } from '@/service/project.service'
import { currentProjectAtom, projectsAtom } from '@/store/project.store'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

export function useGetAllProjects() {
	const [projects, setProjects] = useAtom(projectsAtom)
	const [currentProject, setCurrentProject] = useAtom(currentProjectAtom)

	const { isLoading, error } = useQuery({
		queryKey: ['all projects'],
		queryFn: async () => {
			const data = await projectService.getMyProjects()
			setProjects(data)
			return data
		}
	})

	return { projects, isLoading, error, currentProject, setCurrentProject }
}
