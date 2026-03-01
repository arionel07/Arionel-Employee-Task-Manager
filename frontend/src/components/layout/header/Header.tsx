import { Loader } from '@/components/ui/Loader'
import {
	activeHeaderClass,
	inactiveHeaderClass,
	linkHeaderBase
} from '@/constants/link.constant'
import { useAuth } from '@/hooks/useAuth.hook'
import { Link, useRouterState } from '@tanstack/react-router'
import { ClipboardList, Codesandbox, FolderDot } from 'lucide-react'
import { HeaderProfile } from './header-profil/HeaderProfile'
import { Theme } from './theme/Theme'

export function Header() {
	const { loading } = useAuth()
	const { location } = useRouterState()

	const isActive = (path: string) => location.pathname === path

	//logout
	return (
		<header className="border-b border-zinc-200  bg-white py-3 dark:border-zinc-800 dark:bg-zinc-950">
			<div className="mx-auto px-8 h-14 flex items-center justify-between">
				<Link
					to={'/'}
					className=" text-2xl flex items-center"
				>
					{/* {//<Codesandbox /> //<Shell />} */}
					<Codesandbox className="mr-2 dark:text-zinc-50 text-shadow-zinc-900" />
					ArionelETM
				</Link>

				<nav className="flex items-center gap-4">
					<div className=" relative">
						<Link
							to={'/projects'}
							className={`${linkHeaderBase}  mr-4 ${isActive('/projects') ? activeHeaderClass : inactiveHeaderClass}`}
						>
							<FolderDot
								size={20}
								className="mr-2"
							/>
							Projects
						</Link>
					</div>
					<div className="w-px h-5 bg-zinc-200 dark:bg-zinc-700 mr-4 ml-2 " />
					<Link
						to="/tasks"
						className={`${linkHeaderBase}  ${isActive('/tasks') ? activeHeaderClass : inactiveHeaderClass}`}
					>
						<ClipboardList
							size={20}
							className="mr-2"
						/>
						Tasks
					</Link>
				</nav>
				<div className="flex items-center">
					<div className="mr-4">
						<Theme />
					</div>
					<div className="w-px h-5 bg-zinc-200 dark:bg-zinc-700 mr-6 ml-2 " />
					{loading ? <Loader text="Loading..." /> : <HeaderProfile />}
				</div>
			</div>
		</header>
	)
}

/*  */
