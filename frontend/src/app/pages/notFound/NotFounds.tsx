import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { Diameter, House } from 'lucide-react'

export function NotFoundPage() {
	return (
		<div className="flex items-center justify-center h-full text-center p-5">
			<div className="flex flex-col items-center justify-center">
				<div className="flex text-center mt-100">
					<h2 className="text-6xl flex items-center font-extrabold mb-4">
						4
						<span>
							<Diameter size={42} />
						</span>
						4
					</h2>
					<div className="w-px h-15 bg-zinc-950 dark:bg-zinc-50 ml-6 mr-2 " />
					<p className="text-2xl ml-4 mt-3">Oops! Page not found.</p>
				</div>

				<Link
					className="mt-4"
					to="/"
				>
					<Button>
						<House size={15} />
						Go back home
					</Button>
				</Link>
			</div>
		</div>
	)
}
