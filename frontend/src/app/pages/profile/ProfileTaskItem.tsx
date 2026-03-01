import { Loader } from '@/components/ui/Loader'
import { isTaskDetailed } from '@/types/entities/task.entities'
import type { IUser } from '@/types/entities/user.entities'
import { format } from 'date-fns'
import { useGetAllTasks } from '../project/tasks/hooks/useGetAllTasks'

interface IProps {
	isMyProfile: boolean
	user?: IUser | null
}

export function ProfileTaskItem({ isMyProfile, user }: IProps) {
	const { tasks, isLoading, error } = useGetAllTasks()

	const displayTasks = isMyProfile ? tasks : (user?.tasks ?? [])
	const showLoading = isMyProfile && isLoading

	return (
		<div>
			{showLoading && <Loader />}
			{error && <p className="text-red-500">Failed to load tasks</p>}
			{!showLoading && displayTasks.length === 0 && (
				<p className="text-gray-400">No tasks yet.</p>
			)}
			<ul>
				{displayTasks.map(task => (
					<li
						key={task.id}
						className="p-4 flex justify-between items-center border rounded-md backdrop-blur-xl shadow-lg dark:bg-zinc-900/80 dark:border-zinc-700"
					>
						<div className="flex items-center flex-col">
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
						</div>
						<div className="flex items-center gap-4 text-xs text-gray-400">
							{isTaskDetailed(task) && task.project.manager?.name && (
								<p>
									<span className="font-semibold text-zinc-900 dark:text-zinc-50">
										Manager:{' '}
									</span>
									{task.project.manager.name}
								</p>
							)}
							<p>
								<span className="font-semibold text-zinc-900 dark:text-zinc-50">
									CreatedAt:{' '}
								</span>
								{format(new Date(task.createdAt), 'dd MMM yyyy')}
							</p>
							{task.status === 'COMPLETED' && task.completedAt && (
								<p className="underline">
									<span className="font-semibold text-zinc-900 dark:text-zinc-50">
										CompletedAt:{' '}
									</span>
									{format(new Date(task.completedAt), 'dd MMM yyyy')}
								</p>
							)}
						</div>
						<span
							className={`px-3 py-1 text-xs rounded-full ${task.status === 'COMPLETED' ? 'bg-green-200 text-green-700' : 'bg-gray-200 text-gray-700'}`}
						>
							{task.status}
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}
