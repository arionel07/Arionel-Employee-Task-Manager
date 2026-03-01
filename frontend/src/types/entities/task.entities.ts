import type { TId, TIsoDate, TTaskStatus } from '../common.type'
import type { IDashboardUser } from './dashboardUser.entities'
import type { IProject } from './project.entities'

type ITaskBase = {
	id: TId
	title: string
	status: TTaskStatus
}

export interface ITask extends ITaskBase {
	description?: string | null

	assignedToDashboardUserId: TId
	projectId: TId
	createdBy: TId

	completedAt?: TIsoDate | null
	createdAt: TIsoDate
	updatedAt: TIsoDate
}

export interface ITaskListItem extends ITaskBase {
	dashboardUser?: {
		id: TId
		name?: string | null
		avatar?: string | null
	}
	project?: {
		manager?: { name?: string | null }
	}
}

export interface ITaskDetailed extends ITask {
	project: IProject
	dashboardUser: IDashboardUser
}

export function isTaskDetailed(task: ITask): task is ITaskDetailed {
	return 'project' in task && 'dashboardUser' in task
}
