import { Button } from '@/components/ui/button'
import { themeAtom } from '@/store/theme.store'
import { useAtom } from 'jotai'

export function Theme() {
	const [theme, setTheme] = useAtom(themeAtom)

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	return (
		<div className="cursorPointer">
			<Button
				className="rounded-xl text-sm font-medium transition-all  text-zinc-950 dark:text-zinc-50 hover:bg-opacity-50 size-8 border border-zinc-50 bg-zinc-100 dark:bg-zinc-950/70 dark:border-zinc-600 backdrop-blur-xl shadow-lg "
				onClick={toggleTheme}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					className="size-6 "
				>
					<path
						stroke="none"
						d="M0 0h24v24H0z"
						fill="none"
					></path>
					<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
					<path d="M12 3l0 18"></path>
					<path d="M12 9l4.65 -4.65"></path>
					<path d="M12 14.3l7.37 -7.37"></path>
					<path d="M12 19.6l8.85 -8.85"></path>
				</svg>
			</Button>
		</div>
	)
}
