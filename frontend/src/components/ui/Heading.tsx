export function Heading({ title }: { title: string }) {
	return (
		<div>
			<h1 className="scroll-m-20 border-b pb-3 text-3xl font-semibold tracking-tight first:mt-0">
				{title}
			</h1>
		</div>
	)
}
