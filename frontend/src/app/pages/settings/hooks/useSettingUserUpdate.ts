import { userService } from '@/service/user.service'
import type { IUpdateUserDto } from '@/types/dto/user.dto'
import { useMutation } from '@tanstack/react-query'

export function useSettingUserUpdate() {
	return useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: IUpdateUserDto) => userService.updateMyProfile(data)
	})
}
