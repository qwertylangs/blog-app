import { FC, Suspense } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import Test from './components/Test'
import { classNames } from './helpers/classNames/classNames'
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async'
import { MainPageAsync } from './pages/MainPage/MainPage.async'
import { useTheme } from './theme/useTheme'

const App: FC = () => {
	const { theme, toggleTheme } = useTheme()

	return (
		<main className={classNames('app', {}, [theme])}>
			<button onClick={toggleTheme}>toggle</button>
			<Link to={'/'}>
				<h1>Главная</h1>
			</Link>
			<Link to={'/about'}>
				<h1>Странница про нас</h1>
			</Link>

			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path='/' element={<MainPageAsync />} />
					<Route path='/about' element={<AboutPageAsync />} />
				</Routes>
			</Suspense>

			<Test />
		</main>
	)
}

export default App
