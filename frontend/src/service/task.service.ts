import { api } from '@/api/api'
import { ROUTES } from '@/constants/route.constant'
import type { TApiSuccess } from '@/types/api/response.api'
import type { ICreateTaskDto, IUpdateTaskDto } from '@/types/dto/task.dto'
import type { ITask } from '@/types/entities/task.entities'

class TaskService {
	task = ROUTES.TASKS
	async getTasks(projectId: string, filter?: 'active' | 'completed' | 'all') {
		const response = await api.get<ITask[]>(
			`${this.task}/project/${projectId}`,
			{
				params: { filter }
			}
		)
		return response.data
	}
	async createTask(data: ICreateTaskDto) {
		const response = await api.post<TApiSuccess<ITask>>(`${this.task}`, data)
		return response
	}
	async updateTask(taskId: string, data: IUpdateTaskDto) {
		const response = await api.patch<TApiSuccess<ITask>>(
			`${this.task}/${taskId}`,
			data
		)
		return response
	}
}

export const taskService = new TaskService()
