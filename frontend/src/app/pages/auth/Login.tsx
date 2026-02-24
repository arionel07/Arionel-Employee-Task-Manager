import { Heading } from '@/components/ui/Heading'
import { Loader } from '@/components/ui/Loader'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field/Field'
import type { IAuthLoginForm } from '@/types/entities/auth.entities'
import { Link } from '@tanstack/react-router'
import { ScanFace } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthAction } from './hooks/useAuthAction'

export function LoginPage() {
	const { login } = useAuthAction()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [serverError, setServerError] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IAuthLoginForm>()

	const onSubmit = async (data: IAuthLoginForm) => {
		setIsLoading(true)
		setServerError(null)
		try {
			await login(data)
		} catch (err: any) {
			setServerError(err?.response?.data?.message || 'Something went wrong')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="flex min-h-screen">
			<form
				className="w-1/4 m-auto border border-zinc-200 shadow-sm bg-white text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-800 rounded-2xl p-6"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Heading title="Sign in" />

				<div className="mb-4">
					<Field
						id="email"
						type="email"
						extra="mb-1 mt-4"
						label="Email"
						placeholder="you@example.com"
						{...register('email', {
							required: 'Email is required!',
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Invalid email'
							}
						})}
					/>
					{errors.email && (
						<span className="ml-1 text-left text-sm text-red-500">
							{errors.email.message}
						</span>
					)}
				</div>

				<div className="mb-4">
					<Field
						id="password"
						type="password"
						extra="mb-1"
						label="Password:"
						placeholder="********"
						{...register('password', {
							required: 'Password is required!',
							minLength: {
								value: 6,
								message: 'Minimum 6 characters'
							}
						})}
					/>
					{errors.password && (
						<span className="ml-1 text-sm text-red-500">
							{errors.password.message}
						</span>
					)}
				</div>

				{serverError && (
					<div className="my-4 text-sm text-red-500 bg-red-950 dark:bg-red-50 px-4 py-2 rounded-lg">
						{serverError}
					</div>
				)}

				<Button
					className=""
					disabled={isLoading}
					type="submit"
				>
					{isLoading ? (
						<Loader text="Signing in..." />
					) : (
						<span className="flex items-center">
							<ScanFace className="mr-2" /> Sign in
						</span>
					)}
				</Button>

				<div className="mt-3 border-b border-zinc-600 w-full" />

				<div className="mt-3 flex items-center">
					<span>Don't have an account?</span>
					<Link
						className="ml-2 underline font-bold"
						to={'/register'}
					>
						Create account
					</Link>
				</div>
			</form>
		</div>
	)
}
