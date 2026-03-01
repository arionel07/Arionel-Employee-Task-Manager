import { userService } from '@/service/user.service'
import { useQuery } from '@tanstack/react-query'

export function useGetUserById(userId: string, isMyProfile: boolean) {
	const { data, isLoading } = useQuery({
		queryKey: ['userId', userId],
		queryFn: async () => {
			const res = await userService.getUserById(userId)
			console.log('getUserById response:', res)
			return res
		},
		enabled: !isMyProfile && !!userId
	})

	return { data, isLoading }
}
