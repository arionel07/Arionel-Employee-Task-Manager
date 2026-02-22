export const TaskFilter = {
	ACTIVE: 'active',
	COMPLETED: 'completed',
	ALL: 'all'
} as const

export type TaskFilter = (typeof TaskFilter)[keyof typeof TaskFilter]
