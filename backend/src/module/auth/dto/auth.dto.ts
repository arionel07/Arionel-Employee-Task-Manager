interface IAuthDto {
	email: string
	password: string
}

export interface ILoginDto extends IAuthDto {}

export interface IRegisterDto extends IAuthDto {
	name: string
}
