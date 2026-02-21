export const isOlderThanWeek = (date: Date) => {
	const weeAgo = new Date()
	weeAgo.setDate(weeAgo.getDate() - 7)
	return date < weeAgo
}
