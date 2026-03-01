import type { ITask } from '@/types/entities/task.entities'
import { TaskItem } from './TaskItem'

interface IProps {
	tasks: ITask[] | undefined
	projectId: string
}

export function TaskList({ tasks, projectId }: IProps) {
	return (
		<div className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl shadow-sm divide-y p-3">
			{tasks?.map(task => (
				<TaskItem
					key={task.id}
					task={task}
					projectId={projectId}
				/>
			))}
		</div>
	)
}
