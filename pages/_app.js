import Router from 'next/router'
import { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { useStore } from '../store'
import { SnackbarProvider } from 'notistack'
import Meta from '../components/meta'
import '../styles/globals.css'
import { ApolloProvider } from "@apollo/react-hooks";
import withData from "../utils/apollo";

const App = ({ Component, pageProps, apollo }) => {

	return (
		<ApolloProvider client={apollo}>
			<ThemeProvider
				attribute='class'
				defaultTheme='light'
				disableTransitionOnChange
			>
				<Meta />
				<Component {...pageProps} />
			</ThemeProvider>
		</ApolloProvider>
	)
}

export default withData(App);
