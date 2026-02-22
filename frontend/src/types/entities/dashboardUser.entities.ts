import type { TId, TUserRole } from '../common.type'
import type { IUser } from './user.entities'

export interface IDashboardUser {
	id: TId
	userId: TId
	projectId: TId
	managerId: TId

	name?: string | null
	nickname?: string | null
	avatar?: string | null

	role: TUserRole

	user?: IUser
}
