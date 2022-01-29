import Router from 'next/router'
import { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { onAuthStateChanged } from 'firebase/auth'
import { useStore } from '../store'
import { auth } from '../shared/firebase'
import { SnackbarProvider } from 'notistack'
import Meta from '../components/meta'
import '../styles/globals.css'

const App = ({ Component, pageProps }) => {
	const currentUser = useStore()
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				currentUser.setCurrentUser({
					id: user.uid,
					username: user.displayName,
					email: user.email,
				})
				// localStorage.setItem('userInfo', JSON.stringify(user))
				// console.log(user.displayName)
				// console.log(JSON.stringify(user));
			} else {
				currentUser.setCurrentUser({
					id: '',
					username: '',
					email: '',
				})
				// localStorage.removeItem('userInfo')
			}
		})
	}, [])

	useEffect(() => {
		if (currentUser.currentUser.id !== '') Router.push('/login')
	}, [])
	return (
		<SnackbarProvider maxSnack={3}>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				disableTransitionOnChange
			>
				<Meta />
				<Component {...pageProps} />
			</ThemeProvider>
		</SnackbarProvider>
	)
}

export default App
