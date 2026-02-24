import { Loader as LoaderIcon } from 'lucide-react'

export function Loader({
	text,
	size = 35,
	className = ''
}: {
	text?: string
	size?: number
	className?: string
}) {
	return (
		<div className="flex items-center justify-center py-4 space-y-2">
			<LoaderIcon
				className={`animate-spin text-gray-600 dark:text-gray-200 ${className}`}
				size={size}
			/>
			{text && <span className="text-gray-600 dark:text-gray-200">{text}</span>}
		</div>
	)
}
