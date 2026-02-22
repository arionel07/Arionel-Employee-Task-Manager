import type { IUser } from './user.entities'

interface IAuthBase {
	email: string
	password: string
}

//login
export interface IAuthLoginForm extends IAuthBase {}

//register
export interface IAuthRegisterForm extends IAuthBase {
	name: string
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}
