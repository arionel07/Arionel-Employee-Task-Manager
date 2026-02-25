import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field/Field'
import { Loader } from '@/components/ui/Loader'
import { useAuth } from '@/hooks/useAuth.hook'
import type { IUpdateUserDto } from '@/types/dto/user.dto'
import { Squirrel } from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import { useSettingUserUpdate } from './hooks/useSettingUserUpdate'

export function SettingsUpdate() {
	const { user, fetchUser } = useAuth()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IUpdateUserDto>({
		defaultValues: {
			name: user?.name ?? '',
			nickname: user?.nickname ?? '',
			avatar: user?.avatar ?? ''
		}
	})

	const { mutate, isPending } = useSettingUserUpdate()

	const onSubmit: SubmitHandler<IUpdateUserDto> = data => {
		const filtered = Object.fromEntries(
			Object.entries(data).filter(([_, v]) => v !== '' && v !== undefined)
		) as IUpdateUserDto

		mutate(filtered, {
			onSuccess() {
				fetchUser()
				toast.success('Profile was successfully updated!')
			},
			onError() {
				toast.error('Failed to update profile')
			}
		})
	}

	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className=""
			>
				<div className="mb-4">
					<Field
						id="name"
						type="text"
						extra="mb-1 mt-4"
						label="Name"
						placeholder="Example name"
						{...register('name', {
							minLength: {
								value: 2,
								message: 'Minimum 2 characters'
							}
						})}
					/>
					{errors.name && (
						<span className="ml-1 text-sm text-red-500">
							{errors.name.message}
						</span>
					)}
				</div>

				<div className="mb-4">
					<Field
						id="nickname"
						type="text"
						extra="my-1"
						label="Nickname"
						placeholder="Example nick"
						{...register('nickname', {
							minLength: {
								value: 2,
								message: 'Minimum 2 characters'
							}
						})}
					/>
					{errors.nickname && (
						<span className="ml-1 text-left text-sm text-red-500">
							{errors.nickname.message}
						</span>
					)}
				</div>

				<div className="mb-4">
					<Field
						id="avatar"
						extra="mb-1"
						label="Avatar"
						placeholder="Avatar (url)"
						{...register('avatar', {
							minLength: {
								value: 6,
								message: 'Minimum 6 characters'
							}
						})}
					/>
					{errors.avatar && (
						<span className="ml-1 text-sm text-red-500">
							{errors.avatar.message}
						</span>
					)}
				</div>

				<Button
					disabled={isPending}
					type="submit"
				>
					{isPending ? (
						<Loader text="Updating..." />
					) : (
						<span className="flex items-center">
							<Squirrel className="mr-2" /> Update
						</span>
					)}
				</Button>
			</form>
		</div>
	)
}
