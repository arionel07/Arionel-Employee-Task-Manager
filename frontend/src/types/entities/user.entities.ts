import type { TId, TIsoDate, TUserRole } from '../common.type'
import type { IDashboardUser } from './dashboardUser.entities'
import type { ITask } from './task.entities'

export interface IUser {
	id: TId
	name: string
	email: string
	nickname?: string | null
	avatar?: string | null
	role: TUserRole
	createdAt: TIsoDate
	updatedAt: TIsoDate

	dashboardUsers?: IDashboardUser[]
	tasks?: ITask[]
	// if new Date() then update & created change to Date
}
