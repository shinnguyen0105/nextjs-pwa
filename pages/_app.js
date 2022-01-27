import { ThemeProvider } from 'next-themes'
import Meta from '../components/meta'
import { UserContextProvider } from '../contexts/userContext'
import '../styles/globals.css'

const App = ({ Component, pageProps }) => {
	return (
		<UserContextProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				disableTransitionOnChange
			>
				<Meta />
				<Component {...pageProps} />
			</ThemeProvider>
		</UserContextProvider>
	)
}

export default App
