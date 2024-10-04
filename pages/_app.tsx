import Router from 'next/router'
import { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { onAuthStateChanged } from 'firebase/auth'
import { useStore } from '../store'
import { auth } from '../shared/firebase'
import { SnackbarProvider } from 'notistack'
import Meta from '../components/meta'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	const currentUser = useStore()
	useEffect(() => {
		onAuthStateChanged(auth, (user: { uid: any; displayName: any; email: any; photoURL: any }) => {
			if (user) {
				currentUser.setCurrentUser({
					id: user.uid,
					username: user.displayName,
					email: user.email,
					photoURL: user.photoURL
				})
			} else {
				currentUser.setCurrentUser({
					id: '',
					username: '',
					email: '',
					photoURL: ''
				})
			}
		})
	}, [currentUser])

	useEffect(() => {
		if (currentUser.currentUser.id !== '') Router.push('/login')
	}, [currentUser.currentUser.id])
	return (
		<SnackbarProvider maxSnack={3}>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				disableTransitionOnChange
			>
				<Meta />
				<Component {...pageProps} />
			</ThemeProvider>
		</SnackbarProvider>
	)
}
