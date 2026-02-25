import { Heading } from '@/components/ui/Heading'
import { useAuth } from '@/hooks/useAuth.hook'
import { useLogout } from '@/hooks/useLogout'
import { themeAtom } from '@/store/theme.store'
import { useAtom } from 'jotai'
import { LogOut, Moon } from 'lucide-react'
import avatar from '../../../assets/avatar2.png'
import { SettingsUpdate } from './SettingsUpdate'

export function SettingPage() {
	const [theme, setTheme] = useAtom(themeAtom)
	const { user } = useAuth()
	const { handleLogout } = useLogout({})

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	const userRole = user?.role

	return (
		<div className="">
			<Heading title="Settings" />

			<div className="mt-10">
				<div className="w-100 flex flex-col items-center p-4 cursor-pointer border rounded-4xl backdrop-blur-xl shadow-lg dark:bg-zinc-900/80 dark:border-zinc-700">
					<div className="w-[50px] h-[50px] rounded-full overflow-hidden">
						<img
							src={user?.avatar || avatar}
							className="w-full h-full object-cover object-top"
							alt="user profile avatar"
						/>
					</div>
					<div className="flex flex-col items-center">
						<span className="mt-2 font-bold">
							{user?.email || 'your@example.com'}
						</span>
						<span className="mt-2">{user?.name || 'Example name'}</span>
						<span className="mt-2">{user?.nickname || 'Example nickname'}</span>
						<span
							className={`mt-2 font-bold ${userRole === 'MANAGER' ? 'text-[#A50068]' : 'text-[#5F9EA0]'}`}
						>
							{userRole || 'Example role'}
						</span>
					</div>
				</div>

				<div className="w-100 mt-15 flex flex-col p-5 cursor-pointer border rounded-4xl backdrop-blur-xl shadow-lg dark:bg-zinc-900/80 dark:border-zinc-700">
					<SettingsUpdate />
				</div>

				<div className="w-100 mt-15 flex flex-col p-5 cursor-pointer border rounded-4xl backdrop-blur-xl shadow-lg dark:bg-zinc-900/80 dark:border-zinc-700">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<Moon className="mr-2" />
							Dark mode
						</div>
						<button
							className="toggle"
							onClick={toggleTheme}
							role="switch"
							aria-checked={theme === 'dark'}
							aria-label="Toggle dark mode"
						>
							<span
								className={`knob ${theme === 'dark' ? 'knobOn dark:border dark:border-zinc-100' : ''}`}
							>
								<span className={'star'} />
								<span className={'star'} />
								<span className={'star'} />
							</span>
						</button>
					</div>
					<div className="w-full h-px bg-zinc-200 dark:bg-zinc-700 mt-6 mb-2 " />
					<button
						onClick={handleLogout}
						className="mt-2 w-full flex items-center gap-2 px-4 py-2 text-sm rounded-lg border dark:hover:opacity-90 transition-opacity  cursor-pointer  backdrop-blur-xl shadow-2xl border-transparent text-red-600 bg-[#FAE9E8] dark:bg-[#2D1D20] dark:border-[#5c3336]"
					>
						<LogOut className="mr-2" />
						Log out
					</button>
				</div>
			</div>
		</div>
	)
}
