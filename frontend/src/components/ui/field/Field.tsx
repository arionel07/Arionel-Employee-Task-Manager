import { forwardRef } from 'react'

interface InputFieldProps {
	id: string
	label: string
	extra?: string
	placeholder: string
	variant?: string
	state?: 'error' | 'success'
	disabled?: boolean
	type?: string
	isNumber?: boolean
}

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
	(
		{
			label,
			id,
			extra,
			type = 'text',
			placeholder,
			state,
			disabled,
			isNumber,
			...rest
		},
		ref
	) => {
		return (
			<div className={`${extra}`}>
				<label
					htmlFor={id}
					className="text-medium font-medium text-zinc-950 dark:text-zinc-50 ml-1.5"
				>
					{label}
				</label>

				<input
					type={type}
					disabled={disabled}
					placeholder={placeholder}
					id={id}
					ref={ref}
					className={`w-full rounded-lg border px-3 py-2 text-sm
        bg-white border-zinc-200
        placeholder:text-zinc-400
        focus:outline-none focus:ring-2 focus:ring-zinc-900/10
				mt-3

        dark:bg-zinc-950
        dark:border-zinc-800
        dark:placeholder:text-zinc-500
        dark:focus:ring-zinc-100/10
						${
							disabled
								? '!border-none !bg-gray dark:!bg-white/5 dark:placeholder:!text-gray'
								: state === 'error'
						}`}
					onKeyDown={event => {
						if (
							isNumber &&
							!/[0-9]/.test(event.key) &&
							![
								'Backspace',
								'Tab',
								'Enter',
								'ArrowLeft',
								'ArrowRight'
							].includes(event.key)
						) {
							event.preventDefault()
						}
					}}
					{...rest}
				/>
			</div>
		)
	}
)
Field.displayName = 'field'
