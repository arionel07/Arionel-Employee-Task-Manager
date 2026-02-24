import { Loader } from '@/components/ui/Loader'
import { useAuth } from '@/hooks/useAuth.hook'
import { Link } from '@tanstack/react-router'
import { ClipboardList, Codesandbox, FolderDot } from 'lucide-react'
import { HeaderProfile } from './header-profil/HeaderProfile'
import { Theme } from './theme/Theme'

export function Header() {
	const { loading } = useAuth()
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
					<div className="active-link relative">
						<Link
							to={'/projects'}
							className="flex items-center cursor-pointer mr-4 text-bold text-xl transition-all duration-300 border py-2.5 px-4 rounded-xl border-zinc-200 bg-zinc-50 dark:bg-zinc-900/70 dark:border-zinc-700 backdrop-blur-xl shadow-lg "
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
						to="/task"
						className="flex items-center cursor-pointer text-bold text-xl dark:hover:text-zinc-400 transition-all duration-300 hover:text-zinc-400"
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
