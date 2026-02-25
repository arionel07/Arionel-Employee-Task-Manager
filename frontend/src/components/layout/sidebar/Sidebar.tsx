import { useLogout } from '@/hooks/useLogout'
import { LogOut } from 'lucide-react'
import { ProjectSwitcher } from './project-switcher/ProjectSwitcher'

export function Sidebar() {
	const { handleLogout } = useLogout({})
	return (
		<aside className="h-screen flex flex-col justify-between w-50 sticky border-r border-zinc-300 dark:border-zinc-700 p-4">
			<div>
				<ProjectSwitcher />
			</div>
			<footer className="mb-20">
				<button
					onClick={handleLogout}
					className="border border-zinc-50 bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-600 backdrop-blur-xl shadow-lg p-2 rounded-4xl hover:opacity-80"
				>
					<LogOut
						className="dark:text-zinc-600 text-zinc-400 "
						size={25}
					/>
				</button>
			</footer>
		</aside>
	)
}
