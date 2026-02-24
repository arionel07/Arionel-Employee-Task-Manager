import { apiWithAuth } from '@/api/interceptors.api'
import { ROUTES } from '@/constants/route.constant'
import type { TApiSuccess } from '@/types/api/response.api'
import type { IAddMemberDto, IUpdateMemberDto } from '@/types/dto/project.dto'
import type { IDashboardUser } from '@/types/entities/dashboardUser.entities'
import type { IProject } from '@/types/entities/project.entities'
import type { ICreateProjectDto } from '../../../backend/src/module/project/dto/project.dto'

class ProjectService {
	route = ROUTES.PROJECTS
	async getMyProjects() {
		const response = await apiWithAuth.get<IProject[]>(`${this.route}`)
		return response.data
	}

	async createProject(data: ICreateProjectDto) {
		const response = await apiWithAuth.post<TApiSuccess<IProject>>(
			`${this.route}`,
			data
		)
		return response
	}

	async addMemberToProject(data: IAddMemberDto, projectId: string) {
		const response = await apiWithAuth.post<TApiSuccess<IDashboardUser>>(
			`${this.route}/${projectId}/member`,
			data
		)
		return response
	}

	async updateMember(
		projectId: string,
		dashboardUserId: string,
		data: IUpdateMemberDto
	) {
		const response = await apiWithAuth.patch<TApiSuccess<IDashboardUser>>(
			`${this.route}/${projectId}/member/${dashboardUserId}`,
			data
		)
		return response
	}

	async getProjectMembers(projectId: string) {
		const response = await apiWithAuth.get<TApiSuccess<IDashboardUser[]>>(
			`${this.route}/${projectId}/members`
		)
		return response
	}
}

export const projectService = new ProjectService()
