import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/Heading'
import { Loader } from '@/components/ui/Loader'
import { Select } from '@/components/ui/select/Select'
import { useAuth } from '@/hooks/useAuth.hook'
import { currentProjectAtom } from '@/store/project.store'
import type { TTab } from '@/types/common.type'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { useGetTasks } from './tasks/hooks/useGetTasks'
import { TaskList } from './tasks/TaskList'
import { ProjectUsers } from './users/ProjectUsers'

export function ProjectDetailPage() {
	const { user } = useAuth()
	const [tab, setTab] = useState<TTab>('tasks')

	const currProject = useAtomValue(currentProjectAtom)
	const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
	const {
		data: tasks,
		isLoading,
		error
	} = useGetTasks(currProject?.id ?? '', filter)

	if (!currProject) {
		return <p className="text-red-200">Select a project</p>
	}

	const dashUser = currProject?.dashboardUsers

	const tabClass = (t: TTab) =>
		`px-4 py-2 rounded-lg font-medium transition-all duration-200  ${tab === t ? 'bg-zinc-100 dark:bg-zinc-800' : 'hover:opacity-60'}`

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<Heading title={`${currProject?.name}`} />
				</div>

				{user?.role === 'MANAGER' && tab === 'tasks' ? (
					<Button>Create task</Button>
				) : (
					<Button>Add member</Button>
				)}
			</div>

			<div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-700 pb-3 w-60">
				<button
					className={tabClass('tasks')}
					onClick={() => setTab('tasks')}
				>
					Tasks
				</button>
				<div className="w-px h-10 bg-zinc-200 dark:bg-zinc-700 ml-5 mr-2 " />
				<button
					className={tabClass('users')}
					onClick={() => setTab('users')}
				>
					Members
				</button>
			</div>

			{tab === 'tasks' && (
				<div className="space-y-4">
					<div className="flex items-center mt-5">
						<div className="w-40">
							<Select
								value={filter}
								options={[
									{ label: 'All', value: 'all' },
									{ label: 'Active', value: 'active' },
									{ label: 'Completed', value: 'completed' }
								]}
								onChange={e => setFilter(e.target.value as any)}
							/>
						</div>
						{filter === 'all' || filter === 'active' ? (
							<p className="text-lg ml-10 w-62.5">
								<span className="font-bold text-xl">Active Tasks: </span>
								{tasks?.filter(task => task.status === 'PENDING').length || 0}
							</p>
						) : (
							<p></p>
						)}
					</div>
					{isLoading && <Loader />}

					{error && <p className="text-red-500">Failed to load tasks</p>}

					{!isLoading && tasks?.length === 0 && (
						<p className="text-gray-400">No tasks yet.</p>
					)}
					{!isLoading && tasks && tasks?.length > 0 && (
						<TaskList
							projectId={currProject.id}
							tasks={tasks}
						/>
					)}
				</div>
			)}

			{tab === 'users' && (
				<div className="space-y-4">
					<div className="">
						{!isLoading && dashUser && dashUser?.length > 0 && (
							<ProjectUsers users={dashUser} />
						)}
					</div>
					{isLoading && <Loader />}

					{error && <p className="text-red-500">Failed to load users</p>}

					{!isLoading && dashUser?.length === 0 && (
						<p className="text-gray-400">No users yet.</p>
					)}
				</div>
			)}
		</div>
	)
}
