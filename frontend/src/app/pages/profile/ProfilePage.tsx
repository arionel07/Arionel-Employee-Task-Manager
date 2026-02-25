import { Heading } from '@/components/ui/Heading'
import { useAuth } from '@/hooks/useAuth.hook'
import avatar from '../../../assets/avatar2.png'

export function ProfilePage() {
	const { user, loading } = useAuth()

	const userRole = user?.role

	return (
		<div className="mt-10">
			<Heading title="Profile" />
			<div className="mt-10">
				{/* border-b border-zinc-300 */}
				<div className="flex ">
					<div className="w-[100px] h-[100px] rounded-full overflow-hidden">
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
								{user?.nickname || 'Example nickname'}
							</span>
						</div>
					</div>
				</div>
				<div className="mt-15">
					<ul className="flex items-center border-b border-zinc-200 pb-4 dark:border-zinc-700">
						<button className="text-zinc-950 dark:text-zinc-50 mr-6 font-bold  text-xl">
							Projects
						</button>
						<button className="text-zinc-950 dark:text-zinc-50 text-xl">
							Tasks
						</button>
					</ul>
				</div>
			</div>
		</div>
	)
}
