import { taskService } from '@/service/task.service'
import type { IUpdateTaskDto } from '@/types/dto/task.dto'
import type { ITask } from '@/types/entities/task.entities'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useUpdateTask({
	projectId,
	task
}: {
	projectId: string
	task: ITask
}) {
	const cq = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['update task'],
		mutationFn: ({ taskId, data }: { taskId: string; data: IUpdateTaskDto }) =>
			taskService.updateTask(taskId, data),
		onSuccess: () => {
			cq.invalidateQueries({ queryKey: ['get tasks', projectId] })
			if (task.status === 'PENDING') {
				toast.success('Task completed!')
			}
		}
	})

	return { mutate, isPending }
}
