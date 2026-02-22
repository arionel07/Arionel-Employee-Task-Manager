import type { TUserRole } from '../common.type'

export interface ICreateProjectDto {
	name: string
	description?: string
}

export interface IUpdateMemberDto {
	name?: string
	description?: string
	avatar?: string
}

export interface IAddMemberDto {
	userId?: string
	email?: string
	name?: string
	nickname?: string
	avatar?: string
	role: TUserRole
}
