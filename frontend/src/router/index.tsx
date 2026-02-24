//import { requireRole } from '@/middleware/role.middleware'
import { LoginPage } from '@/app/pages/auth/Login'
import { RegisterPage } from '@/app/pages/auth/Register'
import { DashboardPage } from '@/app/pages/dashboard/DashboardPage'
import { NotFoundPage } from '@/app/pages/notFound/NotFounds'
import { Layout } from '@/components/layout/Layout'
import { requireAuth, requireGuest } from '@/middleware/auth.middleware'
import {
	createRootRoute,
	createRoute,
	createRouter
} from '@tanstack/react-router'

const rootRoute = createRootRoute()

const protectedRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: '__protected',
	component: Layout,
	beforeLoad: async ({ context }) => {
		// guard — это beforeLoad
		requireAuth()
	}
})

const dashboardRoute = createRoute({
	getParentRoute: () => protectedRoute,
	id: 'dashboard'
})

const indexRoute = createRoute({
	getParentRoute: () => dashboardRoute,
	path: '/',
	component: DashboardPage
})

// const projectsRoute = createRoute({
// 	getParentRoute: () => dashboardRoute,
// 	path: '/project'
// 	//component: ProjectsPage
// })

// const projectDetailRoute = createRoute({
// 	getParentRoute: () => dashboardRoute,
// 	path: '/project/:projectId'
// 	//component: ProjectDetailPage
// })

// const taskDetailRoute = createRoute({
// 	getParentRoute: () => dashboardRoute,
// 	path: '/task/project/:projectId'
// 	//component: TaskDetailPage
// })

//const managerRoute

const authRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: '_auth',
	beforeLoad: () => requireGuest()
})

const loginRoute = createRoute({
	getParentRoute: () => authRoute,
	path: '/login',
	component: LoginPage
})

const registerRoute = createRoute({
	getParentRoute: () => authRoute,
	path: '/register',
	component: RegisterPage
})

const notFoundRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '*',
	component: NotFoundPage
})

const routeTree = rootRoute.addChildren([
	protectedRoute.addChildren([
		dashboardRoute.addChildren([
			indexRoute
			// 		projectsRoute,
			// 		projectDetailRoute,
			// 		taskDetailRoute
		])
	]),
	authRoute.addChildren([loginRoute, registerRoute])
])

export const router = createRouter({
	routeTree,
	notFoundRoute
})

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}
