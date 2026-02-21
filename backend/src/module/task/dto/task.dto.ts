export type TFilter = 'all' | 'pending' | 'completed'
export interface ICreateTaskDto {
	title: string
	description?: string
	assignedToDashboardUserId: string
	projectId: string
}

export interface IUpdateTaskDto {
	title?: string
	description?: string
	status?: 'PENDING' | 'COMPLETED'
}
