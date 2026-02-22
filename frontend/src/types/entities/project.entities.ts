import type { TId } from '../common.type'
import type { IDashboardUser } from './dashboardUser.entities'
import type { ITask } from './task.entities'
import type { IUser } from './user.entities'

export interface IProject {
	id: TId
	name: string
	description?: string | null
	managerId: TId

	manager?: IUser
	dashboardUsers?: IDashboardUser[]
	tasks?: ITask[]
}
