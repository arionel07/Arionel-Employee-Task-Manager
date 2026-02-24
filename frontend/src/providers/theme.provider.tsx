import { themeAtom } from '@/store/theme.store'
import { useAtomValue } from 'jotai'
import { useEffect, type ReactNode } from 'react'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const theme = useAtomValue(themeAtom)

	useEffect(() => {
		document.documentElement.className = theme
	}, [theme])

	return <>{children}</>
}
