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
		description: true,
		status: true,
		completedAt: true,
		createdAt: true,
		updatedAt: true,
		projectId: true,
		createdBy: true,
		assignedToDashboardUserId: true,
		project: {
			select: {
				id: true,
				name: true,
				manager: { select: { id: true, name: true } }
			}
		}
	}
}

export const userDashboardSelect = {
	select: {
		id: true,
		userId: true,
		role: true,
		name: true,
		nickname: true,
		avatar: true,
		project: {
			select: {
				id: true,
				name: true,
				description: true,
				managerId: true,
				manager: {
					select: { id: true, name: true, email: true }
				},
				dashboardUsers: {
					select: { id: true, name: true, avatar: true, role: true }
				}
			}
		}
	}
}
