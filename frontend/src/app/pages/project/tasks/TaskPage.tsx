import { Heading } from '@/components/ui/Heading'

import { Loader } from '@/components/ui/Loader'
import { useGetAllProjects } from '../hooks/useGetAllProjects'
import { TaskItem } from './TaskItem'
import { useGetAllTasks } from './hooks/useGetAllTasks'

export function TaskPage() {
	const { projects } = useGetAllProjects()
	const { tasks, isLoading } = useGetAllTasks()

	return (
		<div className="">
			<Heading title="Tasks" />
			{isLoading && <Loader text="Loading tasks..." />}

			<div className="space-y-2 mt-4">
				{tasks.map(task => (
					<TaskItem
						task={task}
						key={task.id}
						projectId={task.projectId}
					/>
				))}
			</div>
			<div className="mt-5">
				{!isLoading &&
					projects
						.filter(project => !tasks.some(t => t.projectId === project.id))
						.map(project => (
							<p className="text-gray-400">No tasks yet in {project.name}.</p>
						))}
			</div>
		</div>
	)
}
