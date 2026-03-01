import { Heading } from '@/components/ui/Heading'
import { Loader } from '@/components/ui/Loader'
import { useAuth } from '@/hooks/useAuth.hook'
import { useParams } from '@tanstack/react-router'
import { useState } from 'react'
import avatar from '../../../assets/avatar2.png'
import type { TTabProfile } from '../../../types/common.type'
import { useGetUserById } from './hook/useGetUserById'
import { ProfileProjectsList } from './ProfileProjectsList'
import { ProfileTaskItem } from './ProfileTaskItem'

export function ProfilePage() {
	const { user: me, loading } = useAuth()
	const { userId } = useParams({
		from: '/__protected/dashboard/profile/$userId'
	})

	const [tab, setTab] = useState<TTabProfile>('projects')

	const isMyProfile = me?.id === userId

	const { data, isLoading } = useGetUserById(userId, isMyProfile)

	const user = isMyProfile ? me : data?.data
	const userRole = user?.role

	if (loading || isLoading) return <Loader text="Loading profile..." />

	const tabClass = (t: TTabProfile) =>
		`relative text-zinc-950 dark:text-zinc-50 mr-6 transition-all duration-300 ${tab === t ? 'profile-active text-xl font-bold' : 'hover:opacity-60'}`

	return (
		<div className="mt-10">
			<Heading title="Profile" />
			<div className="mt-10">
				{/* border-b border-zinc-300 */}
				<div className="flex ">
					<div className="w-25 h-25 rounded-full overflow-hidden">
						<img
							src={user?.avatar || avatar}
							className="w-full h-full object-cover object-top"
							alt="user profile avatar"
						/>
					</div>
					<div className="flex  items-center ml-10">
						<div className="flex flex-col">
							<span className="mt-2 font-bold text-xl">
								{user?.email || 'your@example.com'}
							</span>
							<span
								className={`mt-2 font-bold ${userRole === 'MANAGER' ? 'text-[#A50068]' : 'text-[#5F9EA0]'}`}
							>
								{userRole || 'Example role'}
							</span>
						</div>
						<div className="w-px h-10 bg-zinc-200 dark:bg-zinc-700 ml-6 mr-2 " />
						<div className="ml-5 flex flex-col">
							<span className="mt-2 font-bold text-xl">
								{user?.name || 'Example name'}
							</span>
							<span className="mt-2">
								@{user?.nickname || 'Example nickname'}
							</span>
						</div>
					</div>
				</div>
				<div className="mt-15">
					<ul className="flex items-center border-b border-zinc-200 pb-4 dark:border-zinc-700">
						<button
							className={tabClass('projects')}
							onClick={() => setTab('projects')}
						>
							Projects
						</button>
						<button
							className={tabClass('tasks')}
							onClick={() => setTab('tasks')}
						>
							Tasks
						</button>
					</ul>
				</div>
				<div className="mt-10">
					{tab === 'projects' && (
						<ProfileProjectsList
							isMyProfile={isMyProfile}
							user={user}
						/>
					)}

					<div className="">
						{tab === 'tasks' && (
							<ProfileTaskItem
								isMyProfile={isMyProfile}
								user={user}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
