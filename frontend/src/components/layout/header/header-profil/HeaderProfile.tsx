import { useAuth } from '@/hooks/useAuth.hook'
import { useLogout } from '@/hooks/useLogout'
import { Link } from '@tanstack/react-router'
import { ChevronDown, LogOut, Settings, User } from 'lucide-react'
import { useRef, useState } from 'react'
import avatar from '../../../../assets/avatar2.png'

export function HeaderProfile() {
	const { user } = useAuth()
	const [open, setOpen] = useState<boolean>(false)
	const { handleLogout } = useLogout({ setOpen })
	const ref = useRef<HTMLDivElement>(null)

	return (
		<>
			{open && (
				<div
					className="fixed inset-0 z-10"
					onClick={() => setOpen(false)}
				/>
			)}
			<div
				className="relative"
				ref={ref}
			>
				<button
					className="flex items-center p-3 cursor-pointer border rounded-4xl backdrop-blur-xl shadow-lg dark:bg-zinc-900/80 dark:border-zinc-700"
					onClick={() => setOpen(prev => !prev)}
				>
					<div className="w-[25px] h-[25px] rounded-full overflow-hidden">
						<img
							src={user?.avatar || avatar}
							className="w-full h-full object-cover object-top"
							alt="user profile avatar"
						/>
					</div>
					<div className="flex items-center ml-2">
						<span className="">{user?.nickname || 'user'}</span>
						<ChevronDown
							size={15}
							className="ml-1 font-extralight"
						/>
					</div>
				</button>

				{open && (
					<div className="absolute right-[-10px] top-18 z-20 w-48 rounded-xl border dark:border-bs-zinc-800 shadow-lg backdrop-blur-xl py-1.5 px-3 bg-white dark:bg-zinc-900/40 ">
						<div className="px-4 py-3 flex items-center ">
							<div className="w-[25px] h-[25px] rounded-full overflow-hidden">
								<img
									src={user?.avatar || avatar}
									className="w-full h-full object-cover object-top"
									alt="user profile avatar"
								/>
							</div>
							<div className="ml-3">
								<p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
									{user?.nickname || 'user'}
								</p>
								<p className="text-xs text-zinc-500 truncate">
									{user?.email || 'your@example.com'}
								</p>
							</div>
						</div>

						<Link
							to={'/profile'}
							onClick={() => setOpen(false)}
							className="flex rounded-lg items-center gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100  dark:hover:bg-zinc-800 transition-colors"
						>
							<User size={15} />
							Profile
						</Link>

						<Link
							to={'/settings'}
							onClick={() => setOpen(false)}
							className="flex items-center rounded-lg gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
						>
							<Settings size={15} />
							Settings
						</Link>

						<div className="pt-2 py-3 border-zinc-100 dark:border-zinc-700 border-t ">
							<button
								onClick={handleLogout}
								className="mt-2 w-full flex items-center gap-2 px-4 py-2 text-sm rounded-lg border dark:hover:opacity-90 transition-opacity  cursor-pointer  backdrop-blur-xl shadow-2xl border-transparent text-red-600 bg-[#FAE9E8] dark:bg-[#2D1D20] dark:border-[#5c3336]"
							>
								<LogOut size={15} />
								Logout
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	)
}
