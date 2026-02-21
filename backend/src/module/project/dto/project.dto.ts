import type { TUserRole } from '@core/types'
import type { IUpdateUserDto } from 'module/user/dto/user.dto'

export interface ICreateProjectDto {
	name: string
	description?: string
}

export interface IAddMemberDto extends IUpdateUserDto {
	projectId: string
	userId?: string
	email?: string
	role: TUserRole
}

export interface IUpdateMemberDto extends IUpdateUserDto {}
