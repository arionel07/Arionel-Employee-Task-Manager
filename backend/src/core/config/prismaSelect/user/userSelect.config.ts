export const userSelect = {
	id: true,
	name: true,
	nickname: true,
	avatar: true,
	email: true,
	role: true,
	createdAt: true,
	updatedAt: true
}

export const userAllSelect = {
	id: true,
	name: true,
	nickname: true,
	avatar: true,
	email: true,
	role: true
}

export const userTaskSelect = {
	select: {
		id: true,
		title: true,
		status: true,
		project: {
			select: { id: true, name: true }
		}
	}
}

export const userDashboardSelect = {
	select: {
		id: true,
		role: true,
		project: { select: { id: true, name: true } }
	}
}
