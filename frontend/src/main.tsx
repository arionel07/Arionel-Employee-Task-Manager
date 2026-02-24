import { RouterProvider } from '@tanstack/react-router'
import { createRoot } from 'react-dom/client'
import { AppProvider } from './providers/app.provider.tsx'
import { router } from './router/index.tsx'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
	<AppProvider>
		<RouterProvider router={router} />
	</AppProvider>
)
