import { Outlet } from '@tanstack/react-router'
import { Container } from '../ui/Container'
import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'

export function Layout() {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />

			<div className="flex flex-1">
				<Sidebar />
				<main className="flex-1">
					<Container>
						<div className="mt-4">
							<Outlet />
						</div>
					</Container>
				</main>
			</div>
		</div>
	)
}
