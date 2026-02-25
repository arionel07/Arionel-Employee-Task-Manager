import { Plus } from 'lucide-react'

export function CreateProjectButton() {
	return (
		<button className=" text-lg text-zinc-600 dark:text-zinc-400 w-full flex items-center justify-between ">
			Project{' '}
			<Plus
				className="text-zinc-500 dark:text-zinc-400"
				size={17}
			/>
		</button>
	)
}
