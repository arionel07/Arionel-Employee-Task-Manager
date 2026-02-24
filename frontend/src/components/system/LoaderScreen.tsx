import { Loader } from '../ui/Loader'

export function LoaderScreen() {
	return (
		<div className="flex items-center justify-center h-screen">
			<Loader
				text="Initializing app..."
				size={50}
			/>
		</div>
	)
}
