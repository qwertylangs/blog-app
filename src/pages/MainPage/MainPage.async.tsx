import { lazy } from 'react'

export const MainPageAsync = lazy(() => {
	return new Promise((resolve) => {
		// @ts-ignore
		setTimeout(() => resolve(import('./MainPage.tsx')), 1500)
	})
})
