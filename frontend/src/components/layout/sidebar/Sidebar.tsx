import { useLogout } from '@/hooks/useLogout'
import { LogOut } from 'lucide-react'

export function Sidebar() {
	const { handleLogout } = useLogout({})
	return (
		<aside className="h-[90vh] flex flex-col justify-between w-[200px] sticky border-r border-zinc-300 dark:border-zinc-700 p-4">
			<div></div>
			<footer className="">
				<button onClick={handleLogout}>
					<LogOut
						className="dark:text-zinc-700 text-zinc-400"
						size={30}
					/>
				</button>
			</footer>
		</aside>
	)
}
