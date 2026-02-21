import { Role, TaskStatus } from '../../../prisma/generated/prisma/enums'
export type TUserRole = Role
export type TStatus = TaskStatus

export interface IJwtPayload {
	id: string
	email: string
	role: TUserRole
}
