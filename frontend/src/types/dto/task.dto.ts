import type { TId, TTaskStatus } from '../common.type'

export interface ICreateTaskDto {
	title: string
	projectId: TId
	assignedToDashboardUserId: TId
	description?: string
}

export interface IUpdateTaskDto {
	title?: string
	description?: string
	status?: TTaskStatus
}
