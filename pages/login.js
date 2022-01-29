import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import Page from '../components/page'
import Section from '../components/section'
import { auth } from '../shared/firebase'
import { useSnackbar } from 'notistack'
import Router from 'next/router'
import Link from 'next/link'
import { useStore } from '../store'

const Login = () => {
	const currentUser = useStore(state => state.currentUser)
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const { enqueueSnackbar } = useSnackbar()

	const [accountValues, setAccountValues] = useState({
		email: '',
		password: '',
	})

	const handleAccountChange = (event) => {
		const { name, value } = event.target
		setAccountValues((previousState) => {
			return { ...previousState, [name]: value }
		})
	}

	const handleSignInWithEmailAndPassword = async () => {
		try {
			await signInWithEmailAndPassword(auth, accountValues.email, accountValues.password);
			enqueueSnackbar('Login successfully!', {
				variant: 'success',
			});
			Router.push('/')
		} catch (error) {
			console.log(error)
			enqueueSnackbar('Incorrect email or password. Please try again!', {
				variant: 'error',
			})
		}
	}

	const handleSignInWithGoogle = async (provider) => {
		try {
			await signInWithPopup(auth, provider)
			.then((res) => {
				console.log(res.user)
			})
			.catch((err) => {
				setError(`Error: ${err.code}`)
			})
			.finally(() => {
				setLoading(false)
			})
			enqueueSnackbar('Login successfully!', {
				variant: 'success',
			});
		Router.push('/')
		} catch (error) {
			console.log(error)
			enqueueSnackbar('Your login attempt was not successful. Please try again!', {
				variant: 'error',
			})
		}
		
	}
	if (currentUser.email) {
		Router.push('/')
	}

	return (
		<Page>
			<Section>
				<div className='mt-2'>
					<div className='sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl lg:shadow-xl md:shadow-xl p-2'>
						<h2 className='text-center text-4xl text-gray-100 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold'>
							Log in
						</h2>
						<div className='mt-12'>
							<div>
								<div className='text-sm font-bold text-gray-700 tracking-wide'>
									Email Address
								</div>
								<input
									className='w-full text-lg py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-indigo-500'
									type=''
									placeholder='Enter your email...'
									id='email'
									name='email'
									onChange={handleAccountChange}
									value={accountValues.email}
								/>
							</div>
							<div className='mt-8'>
								<div className='flex justify-between items-center'>
									<div className='text-sm font-bold text-gray-700 tracking-wide'>
										Password
									</div>
									<div>
										<a
											className='text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                        cursor-pointer'
										>
											Forgot Password?
										</a>
									</div>
								</div>
								<input
									className='w-full text-lg py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-indigo-500'
									type='password'
									placeholder='Enter your password'
									id='password'
									name='password'
									onChange={handleAccountChange}
									value={accountValues.password}
								/>
							</div>
							<div className='mt-10'>
								<button
									className='bg-gray-700 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg'
								onClick={handleSignInWithEmailAndPassword}>
									Log in
								</button>
							</div>
							<div className='mt-5'>
								<button
									className='bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg'
									onClick={() => handleSignInWithGoogle(new GoogleAuthProvider())}
								>
									Log in with Google
								</button>
							</div>
							<div className='mt-12 text-sm font-display font-semibold text-gray-700 text-center'>
								Don't have an account ?
								<Link href='/register'>
									<a className='cursor-pointer text-indigo-600 hover:text-indigo-800'>
										Register
									</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</Section>
		</Page>
	)
}

export default Login
