import { apiWithAuth } from '@/api/interceptors.api'
import { ROUTES } from '@/constants/route.constant'
import type { TApiSuccess } from '@/types/api/response.api'
import type { ICreateTaskDto, IUpdateTaskDto } from '@/types/dto/task.dto'
import type { ITask } from '@/types/entities/task.entities'

class TaskService {
	task = ROUTES.TASKS
	async getTasks(projectId: string, filter?: 'active' | 'completed' | 'all') {
		const response = await apiWithAuth.get<ITask[]>(
			`${this.task}/project/${projectId}`,
			{
				params: { filter }
			}
		)
		return response.data
	}
	async createTask(data: ICreateTaskDto) {
		const response = await apiWithAuth.post<TApiSuccess<ITask>>(
			`${this.task}`,
			data
		)
		return response
	}
	async updateTask(taskId: string, data: IUpdateTaskDto) {
		const response = await apiWithAuth.patch<TApiSuccess<ITask>>(
			`${this.task}/${taskId}`,
			data
		)
		return response
	}
}

export const taskService = new TaskService()
