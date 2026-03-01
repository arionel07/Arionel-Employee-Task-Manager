import type { IDashboardUser } from '@/types/entities/dashboardUser.entities'
import { useNavigate } from '@tanstack/react-router'
// import { useGetAllProjects } from '../hooks/useGetAllProjects'
// import { useGetAllDashboardUsers } from './hooks/useGetAllDashboardUsers
import avatar from '../../../../assets/avatar2.png'

interface IProps {
	users: IDashboardUser[] | undefined
}

export function ProjectUsers({ users }: IProps) {
	const navigate = useNavigate()

	if (!users || users.length === 0) {
		return <p className="text-gray-400">No users in this project.</p>
	}

	return (
		<ul className="space-y-2">
			{users?.map(user => (
				<li
					key={user.id}
					onClick={() =>
						navigate({
							to: '/profile/$userId',
							params: { userId: user.userId }
						})
					}
					className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:opacity-60 transition-all duration-200 dark:border-zinc-700 dark:bg-zinc-900/80"
				>
					<div className="">
						<img
							src={user.avatar || avatar}
							alt={`${user.name || user.nickname}`}
							className="w-8 h-8 rounded-full object-cover"
						/>
					</div>
					<div className="">
						<p className="font-medium">{user.name}</p>
						{user.nickname && (
							<p className="text-xs text-gray-400">@{user.nickname}</p>
						)}
					</div>
					<span
						className={`ml-auto text-xs  ${user.role === 'MANAGER' ? 'text-[#A50068]' : 'text-[#5F9EA0]'}`}
					>
						{user.role}
					</span>
				</li>
			))}
		</ul>
	)
}
