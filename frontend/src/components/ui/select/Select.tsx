import * as React from 'react'

interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	options: { label: string; value: string }[]
	placeholder?: string
}
export const Select = React.forwardRef<HTMLSelectElement, ISelectProps>(
	({ options, placeholder, className = '', ...props }, ref) => {
		return (
			<select
				className={`w-full rounded-lg border px-3 py-2 text-sm bg-white border-zinc-200 text-zinc-900 focus:outline-0 focus:ring-2 focus:ring-zinc-900/10 disabled:opacity-50 disabled:pointer-events-none transition-colors cursor-pointer
					dark:bg-zinc-950
          dark:border-zinc-800
          dark:text-zinc-50
          dark:focus:ring-zinc-100/10  ${className}`}
				{...props}
			>
				{placeholder && (
					<option
						value=""
						disabled
						hidden
					>
						{placeholder}
					</option>
				)}
				{options.map(opt => (
					<option
						value={opt.value}
						key={opt.value}
					>
						{opt.label}
					</option>
				))}
			</select>
		)
	}
)

Select.displayName = 'Select'
