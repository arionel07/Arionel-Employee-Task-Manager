import type { ReactNode } from 'react'

export function PageWrapper({ children }: { children: ReactNode }) {
	return <div className="py-3.5">{children}</div>
}
