import type { TId, TIsoDate, TUserRole } from '../common.type'
import type { IDashboardUser } from './dashboardUser.entities'
import type { ITaskDetailed } from './task.entities'

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
	tasks?: ITaskDetailed[] // ← ITaskDetailed вместо ITask
}
