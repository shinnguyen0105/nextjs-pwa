// import { useEffect, createContext, useContext, useState } from 'react'
// import { auth } from '../shared/firebase'
// import { onAuthStateChanged, signInWithPopup } from 'firebase/auth'
// import { useStore } from '../store'

// const FirebaseAuthContext = createContext(undefined);

// export const FirebaseAuthProvider = ({ children }) => {
//     const currentUser = useStore();
// 	const [loading, setLoading] = useState(false);


// 	const signInwithGoogle = (provider) => {
// 			console.log("1111111");
// 			provider.setCustomParameters({
// 				prompt: "select_account"
// 			  });
// 			console.log('provider: ' + provider);
// 			signInWithPopup(auth, provider)
// 				.then((res) => {
// 					console.log(res.user)
// 				currentUser.setCurrentUser({
// 						userInfo: res.user,
// 					});
// 				})
// 				.catch((err) => {
// 					setError(`Error: ${err.code}`)
// 				})
// 				.finally(() => {
// 					console.log("successfully")
// 				});
// 			console.log("successfully")
// 	};

// 	useEffect(() => {
//         console.log("auth: " + auth);
// 		const unsubscribe = onAuthStateChanged(auth, (user) => {
// 			if (user) {
// 				setCurrentUser({
// 					userInfo: user,
// 				});
// 				setLoading(false)
// 			} else {
// 				setCurrentUser(undefined)
// 			}
// 		});
// 		console.log(currentUser);
// 		return unsubscribe;
// 	}, [])

// 	const value = {
// 		currentUser.userInfo,
// 		signInwithGoogle
// 	}
// 	return (
// 		<FirebaseAuthContext.Provider value={value}>
// 			{children}
// 		</FirebaseAuthContext.Provider>
// 	)
// }

// export const useFirebaseAuth = () => {
//     const user = useContext(FirebaseAuthContext);
//     if (user === undefined) {
//         throw new Error(
//             "useFirebaseAuth must be used within a FirebaseAuthProvider"
//           );
//     }
//     return user;
// }
