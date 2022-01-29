import { ThemeProvider } from 'next-themes'
import Meta from '../components/meta'
// import { FirebaseAuthProvider } from '../shared/firebaseAuthContext'
import '../styles/globals.css'
import { onAuthStateChanged } from "firebase/auth";
import { useStore } from '../store';
import { useEffect } from 'react';
import { auth } from '../shared/firebase';
import Router from 'next/router';


const App = ({ Component, pageProps }) => {
	const currentUser = useStore();
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
		  if (user) {
			currentUser.setCurrentUser({
				id: user.uid,
				username: user.displayName,
				email: user.email
			});
			// localStorage.setItem('userInfo', JSON.stringify(user))
			// console.log(user.displayName)
			// console.log(JSON.stringify(user));
		  } else {
			console.log('user is null')
			currentUser.setCurrentUser({
				id: '',
				username: '',
				email: '',
			});
			// localStorage.removeItem('userInfo')
		  }
		});
	  }, []);

	  useEffect(() => {
		if (currentUser.currentUser.id !== '') Router.push('/login');
	  }, []);
	return (
		// <FirebaseAuthProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				disableTransitionOnChange
			>
				<Meta />
				<Component {...pageProps} />
			</ThemeProvider>
		// </FirebaseAuthProvider>
	)
}

export default App
