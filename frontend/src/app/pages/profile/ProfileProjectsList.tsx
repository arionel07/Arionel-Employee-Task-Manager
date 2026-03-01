import { Loader } from '@/components/ui/Loader'
import type { IUser } from '@/types/entities/user.entities'
import { useGetAllProjects } from '../project/hooks/useGetAllProjects'

interface IProps {
	isMyProfile: boolean
	user?: IUser | null
}

export function ProfileProjectsList({ isMyProfile, user }: IProps) {
	const { projects, error, isLoading } = useGetAllProjects()

	if (!isMyProfile) {
		const userProjects = user?.dashboardUsers

		return (
			<ul className="mt-5">
				{!userProjects?.length && (
					<p className="text-gray-400">No projects yet.</p>
				)}
				{userProjects?.map(du => (
					<li
						key={du.id}
						className="mt-4 p-3 border rounded-lg dark:border-zinc-700 dark:bg-zinc-900/80"
					>
						<h5 className="font-bold text-xl mb-3">{du.project?.name}</h5>
						<div className="flex items-center mt-2 gap-4">
							<p className="text-sm">
								<span className="font-bold">Users: </span>
								{du.project?.dashboardUsers?.length || 0}
							</p>
							<p className="text-sm">
								<span className="font-bold">Manager: </span>
								{du.project?.manager?.name}
							</p>
							<p className="text-sm">
								<span className="font-bold">Role: </span>
								{du.role}
							</p>
						</div>
						{du.project?.description && (
							<p className="mt-3 text-sm underline">{du.project.description}</p>
						)}
					</li>
				))}
			</ul>
		)
	}

	// Мой профиль — берём из атома
	return (
		<ul className="mt-5">
			{isLoading && <Loader />}
			{error && <p className="text-red-500">Failed to load projects</p>}
			{!isLoading && projects?.length === 0 && (
				<p className="text-gray-400">No projects yet.</p>
			)}
			{!isLoading &&
				projects?.map(project => (
					<li
						key={project.id}
						className="mt-4 p-3 border rounded-lg dark:border-zinc-700 dark:bg-zinc-900/80"
					>
						<h5 className="font-bold text-xl mb-3">{project.name}</h5>
						<div className="flex items-center mt-2 gap-4">
							<p className="text-sm">
								<span className="font-bold">Users: </span>
								{project.dashboardUsers?.length || 0}
							</p>
							<p className="text-sm">
								<span className="font-bold">Manager: </span>
								{project.manager?.name}
							</p>
						</div>
						{project.description && (
							<p className="mt-3 text-sm underline">{project.description}</p>
						)}
					</li>
				))}
		</ul>
	)
}
