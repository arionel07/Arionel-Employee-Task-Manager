import { useGetAllProjects } from '@/app/pages/project/hooks/useGetAllProjects'
import { Loader } from '@/components/ui/Loader'
import { useAuth } from '@/hooks/useAuth.hook'
import type { IProject } from '@/types/entities/project.entities'
import { useNavigate } from '@tanstack/react-router'
import { CreateTaskButton } from '../createButton/CreateButton'
import { CreateProjectButton } from '../createButton/CreateProjectButton'

export function ProjectSwitcher() {
	const { user } = useAuth()
	const navigate = useNavigate()

	const userRole = user?.role === 'MANAGER'

	const { projects, isLoading, setCurrentProject } = useGetAllProjects()

	const handleSelect = (project: IProject) => {
		setCurrentProject(project)
		navigate({ to: `/project/${project.id}` })
	}

	return (
		<div className="px-4 mb-4">
			<div className="">{userRole ? <CreateTaskButton /> : ''}</div>
			{/* <button
				className="border rounded-xl p-2 cursor-pointer bg-gray-50"
				onClick={() => setOpen(prev => !prev)}
			>
				{currentProject?.name || 'No project yet!'}
			</button> */}
			{userRole ? (
				<CreateProjectButton />
			) : (
				<p className="text-lg text-zinc-600 dark:text-zinc-400">Projects</p>
			)}

			{isLoading ? (
				<Loader
					size={20}
					text="Initilazing projects..."
				/>
			) : (
				<ul className="mt-4">
					{/* : (
						
					)} */}
					{projects.map(project => (
						<li
							className="list-disc px-3 py-2 cursor-pointer hover:opacity-50"
							key={project.id}
							onClick={() => handleSelect(project)}
						>
							{project.name}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
