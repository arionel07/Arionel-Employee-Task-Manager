import type { ReactNode } from 'react'
import { AuthProvider } from './auth.provider'
import { QueryProvider } from './queryClient.provider'
import { ThemeProvider } from './theme.provider'

import { Toaster } from 'sonner'

export const AppProvider = ({ children }: { children: ReactNode }) => {
	return (
		<QueryProvider>
			<ThemeProvider>
				<AuthProvider>
					{children}
					<Toaster position="bottom-right" />
				</AuthProvider>
			</ThemeProvider>
		</QueryProvider>
	)
}
