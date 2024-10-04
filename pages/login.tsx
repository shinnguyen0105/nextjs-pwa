import {
	GoogleAuthProvider,
	signInWithPopup,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import { useState } from 'react'
import Page from '../components/page'
import Section from '../components/section'
import { auth } from '../shared/firebase'
import { useSnackbar } from 'notistack'
import Router from 'next/router'
import Link from 'next/link'
import { useStore } from '../store'

const Login = () => {
	const currentUser = useStore((state) => state.currentUser)
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
		setLoading(true);
		try {
			await signInWithEmailAndPassword(
				auth,
				accountValues.email,
				accountValues.password
			)
				.then((res) => {
					if (res.user) {
						enqueueSnackbar('Login successfully!', {
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
		} catch (error) {
			console.log(error)
			enqueueSnackbar(
				'Your login attempt was not successful. Please try again!' +
					` Error: ${error.code}`,
				{
					variant: 'error',
				}
			)
		}
	}

	const handleSignInWithGoogle = async (provider) => {
		setLoading(true)
		try {
			await signInWithPopup(auth, provider)
				.then((res) => {
					//console.log(res.user)
					if (res.user) {
						enqueueSnackbar('Login successfully!', {
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
					//console.log('login successfully')
					// nothing to do
					setLoading(false)
				})
		} catch (error) {
			console.log(error)
			enqueueSnackbar(
				'Your login attempt was not successful. Please try again!' +
					` Error: ${error.code}`,
				{
					variant: 'error',
				}
			)
		}
	}
	if (currentUser.email) {
		Router.push('/')
	}

	return (
		<Page>
			<Section key='login'>
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
										<Link href='/reset_password'>
										<a
											className='text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
											cursor-pointer'
											>
											Forgot Password?
										</a>
											</Link>
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
									onClick={handleSignInWithEmailAndPassword}
									disabled={loading}
								>
									Log in
								</button>
							</div>
							<div className='mt-5'>
								<button
									className='bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg'
									onClick={() =>
										handleSignInWithGoogle(new GoogleAuthProvider())
									}
									disabled={loading}
								>
									Log in with Google
								</button>
							</div>
							<div className='mt-12 text-sm font-display font-semibold text-gray-700 text-center'>
								Don&apos;t have an account ?
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
