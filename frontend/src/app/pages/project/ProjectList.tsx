import { Heading } from '@/components/ui/Heading'
import { Loader } from '@/components/ui/Loader'
import type { IProject } from '@/types/entities/project.entities'
import { useNavigate } from '@tanstack/react-router'
import { useGetAllProjects } from './hooks/useGetAllProjects'

export function ProjectList() {
	const navigate = useNavigate()
	const { projects, isLoading, error, setCurrentProject } = useGetAllProjects()

	const handleSelect = (project: IProject) => {
		setCurrentProject(project)
		navigate({ to: '/project/$projectId', params: { projectId: project.id } })
	}

	return (
		<div className="mt-10">
			<Heading title="Projects list" />

			{error && (
				<p className="mt-10 text-hsl(0, 100%, 50%)-500">Failed to load tasks</p>
			)}

			<ul className="flex flex-col ">
				{isLoading ? (
					<Loader text="Loading projects..." />
				) : (
					projects.map(project => (
						<li
							onClick={() => handleSelect(project)}
							className="mt-5 flex flex-col py-5 px-6 cursor-pointer border rounded-4xl backdrop-blur-xl shadow-lg dark:bg-zinc-900/50 dark:border-zinc-700 hover:opacity-60 transition-opacity duration-500"
							key={project.id}
						>
							<h5 className="font-bold text-2xl mb-3">{project.name}</h5>
							<p className="mb-5 underline">{project.description}</p>
							<p className="text-medium mb-5">
								<span className="font-bold text-lg">Manager: </span>
								{project.manager?.name}
							</p>
							<p>
								<span className="font-bold text-lg">Users: </span>
								{project.dashboardUsers?.length || 0}
							</p>
						</li>
					))
				)}
			</ul>
		</div>
	)
}
