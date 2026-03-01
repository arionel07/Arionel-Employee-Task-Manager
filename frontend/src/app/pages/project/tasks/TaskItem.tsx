import { Loader } from '@/components/ui/Loader'
import {
	isTaskDetailed,
	type ITask,
	type ITaskDetailed
} from '@/types/entities/task.entities'
import { format } from 'date-fns'
import { useUpdateTask } from './hooks/useUpdateTask'

interface IProps {
	task: ITaskDetailed | ITask
	projectId: string
}

export function TaskItem({ task, projectId }: IProps) {
	const { mutate, isPending } = useUpdateTask({ projectId, task })

	const handleToggle = () => {
		mutate({
			taskId: task.id,
			data: {
				status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED'
			}
		})
	}
	const statusColor = {
		PENDING: 'bg-gray-200 text-gray-700',
		COMPLETED: 'bg-green-200 text-green-700'
	}[task.status]

	return (
		<div className="p-4 flex justify-between items-center cursor-pointer border rounded-md backdrop-blur-xl shadow-lg dark:bg-zinc-900/80 dark:border-zinc-700">
			<div className="flex items-center gap-3">
				<input
					type="checkbox"
					checked={task.status === 'COMPLETED'}
					onChange={handleToggle}
					disabled={isPending}
					className="w-6 h-6 cursor-pointer"
				/>
				<div className="ml-6">
					<p
						className={`font-medium ${task.status === 'COMPLETED' ? 'line-through text-gray-400' : ''}`}
					>
						{task.title}
					</p>
					{task.description && (
						<p className="text-sm text-gray-500 line-clamp-1">
							{task.description}
						</p>
					)}
					<div className="flex items-center gap-4 text-xs text-gray-400 mt-3">
						{isTaskDetailed(task) && task.project.manager?.name && (
							<p>
								<span className="font-bold text-sm">Manager: </span>
								{task.project.manager?.name}
							</p>
						)}

						<p className="mt-0.75">
							Created:
							{format(new Date(task.createdAt), 'dd MMM yyyy')}
						</p>
						{task.status === 'COMPLETED' && task.completedAt && (
							<p className="mt-0.75 underline">
								Completed:
								{format(new Date(task.completedAt), 'dd MMM yyyy')}
							</p>
						)}
					</div>
				</div>
			</div>

			<span className={`px-3 py-1 text-xs rounded-full ${statusColor}`}>
				{task.status}
			</span>

			{isPending && <Loader text="Updating..." />}
		</div>
	)
}
