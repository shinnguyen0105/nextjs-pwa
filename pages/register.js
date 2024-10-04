import {
	GoogleAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	sendEmailVerification,
} from 'firebase/auth'
import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { passwordCheck } from '../utils/regex/index'
import Page from '../components/page'
import Section from '../components/section'
import { auth } from '../shared/firebase'
import { useStore } from '../store'
import Router from 'next/router'
import Link from 'next/link'

const Register = () => {
	const currentUser = useStore()

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

	const [reTypePassword, setReTypePassword] = useState({
		rePassword: '',
	})

	const handleReTypePasswordChange = (event) => {
		const { name, value } = event.target
		setReTypePassword((previousState) => {
			return { ...previousState, [name]: value }
		})
	}

	const handleSignIn = async (provider) => {
		setLoading(true)
		await signInWithPopup(auth, provider)
			.then((res) => {
				//console.log(res.user)
				if (res.user) {
					sendEmailVerification(res.user)
					enqueueSnackbar('Register successfully!', {
						variant: 'success',
					})
					Router.push('/')
				}
			})
			.catch((err) => {
				enqueueSnackbar(
					'Your login attempt was not successful. Please try again!' +
						` Error: ${err.code}`,
					{
						variant: 'error',
					}
				)
			})
			.finally(() => {
				// console.log('login successfully')
				// nothing to do
				setLoading(false)
			})
	}

	const handleSignUp = async () => {
		setLoading(true)
		if (!accountValues.password || !accountValues.email) {
			enqueueSnackbar('Do not leave password or email field blank', {
				variant: 'error',
			})
			setLoading(false)
		} else if (!passwordCheck.test(accountValues.password)) {
			enqueueSnackbar(
				'Password must have at least 8 characters (Including:> = 1 special character,> = 1 digit,> = 1 uppercase letter)',
				{ variant: 'error' }
			)
			setLoading(false)
		} else if (accountValues.password !== reTypePassword.rePassword) {
			enqueueSnackbar(
				'Password and Re-enter password do not match! Please try again',
				{ variant: 'error' }
			)
			setLoading(false)
		} else {
			try {
				await createUserWithEmailAndPassword(
					auth,
					accountValues.email,
					accountValues.password
				)
					.then((res) => {
						//console.log(res.user)
						if (res.user) {
							enqueueSnackbar('Register successfully!', {
								variant: 'success',
							})
							Router.push('/')
						}
					})
					.catch((err) => {
						enqueueSnackbar(
							'Your register attempt was not successful. Please try again!' +
								`Error: ${err.code}`,
							{
								variant: 'error',
							}
						)
					})
					.finally(() => {
						// console.log('login successfully')
						// nothing to do
						setLoading(false)
					})
			} catch (error) {
				console.log(error)
				enqueueSnackbar(
					'Your register attempt was not successful. Please try again!' +
						`Error: ${error.code}`,
					{
						variant: 'error',
					}
				)
			}
		}
	}

	if (currentUser.currentUser.email) {
		Router.push('/')
	}

	return (
		<Page>
			<Section>
				<div className='mt-2'>
					<div className='sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl lg:shadow-xl md:shadow-xl p-2'>
						<h2 className='text-center text-4xl text-gray-100 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold'>
							Register
						</h2>
						<div className='mt-12'>
							<div>
								<div className='text-sm font-bold text-gray-700 tracking-wide'>
									Email Address
								</div>
								<input
									className='w-full text-lg py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-indigo-500'
									type='text'
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
							<div className='mt-8'>
								<div className='flex justify-between items-center'>
									<div className='text-sm font-bold text-gray-700 tracking-wide'>
										Confirm Password
									</div>
								</div>
								<input
									className='w-full text-lg py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-indigo-500'
									type='password'
									placeholder='Enter your password'
									id='rePassword'
									name='rePassword'
									onChange={handleReTypePasswordChange}
									value={reTypePassword.rePassword}
								/>
							</div>
							<div className='mt-10'>
								<button
									className='bg-gray-700 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg'
									onClick={handleSignUp}
									disabled={loading}
								>
									Register
								</button>
							</div>
							<div className='mt-5'>
								<button
									className='bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg'
									onClick={() => handleSignIn(new GoogleAuthProvider())}
									disabled={loading}
								>
									Log in with Google
								</button>
							</div>
							<div className='mt-12 text-sm font-display font-semibold text-gray-700 text-center'>
								Already have an account ?{' '}
								<Link href='/login'>
									<a className='cursor-pointer text-indigo-600 hover:text-indigo-800'>
										Login
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

export default Register
