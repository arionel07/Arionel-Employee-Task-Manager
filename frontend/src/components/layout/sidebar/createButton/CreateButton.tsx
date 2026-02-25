import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function CreateTaskButton() {
	return (
		<Button className="hover:bg-transparent py-4 px-3 w-full rounded-lg border border-zinc-200 bg-zinc-100 dark:bg-zinc-950/70 dark:border-zinc-600 backdrop-blur-xl shadow-lg text-zinc-900 dark:text-zinc-50 mb-6">
			<Plus />
			Create Task
		</Button>
	)
}
