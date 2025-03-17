import { sendPasswordResetEmail } from 'firebase/auth'
import { ChangeEvent, useState } from 'react'
import Page from '../components/page'
import Section from '../components/section'
import { auth } from '../shared/firebase'
import { useSnackbar } from 'notistack'
import Router from 'next/router'

const ResetPassword = () => {
	const { enqueueSnackbar } = useSnackbar()

	const [accountValues, setAccountValues] = useState({
		email: '',
	})

	const handleAccountChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setAccountValues((previousState) => {
			return { ...previousState, [name]: value }
		})
	}

	const handleResetPasswordWithEmail = async () => {
		try {
			await sendPasswordResetEmail(auth, accountValues.email)
				.then(() => {
					console.log('send the request reset password successfully');
					enqueueSnackbar('Reset successfully!', {
						variant: 'success',
					})
				})
				.catch((err: { code: string }) => {
					enqueueSnackbar(
						'Your request was not successful. Please try again!' +
							`Error: ${err.code}`,
						{
							variant: 'error',
						}
					)
				})
				.finally(() => {
					enqueueSnackbar('Send the email reset password successfully. Please check your email!', {
						variant: 'success',
					})
                    Router.push('/login')
				})
		} catch (error) {
			console.log(error)
			enqueueSnackbar('Your request was not successful. Please try again!', {
				variant: 'error',
			})
		}
	}

	return (
		<Page>
			<Section key='reset-pw'>
				<div className='mt-2'>
					<div className='sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl lg:shadow-xl md:shadow-xl p-2'>
						<h2 className='text-center text-4xl text-gray-100 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold'>
							Reset Your Password
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

							<div className='mt-10'>
								<button
									className='bg-gray-700 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg'
									onClick={handleResetPasswordWithEmail}
								>
									Reset Password
								</button>
							</div>
						</div>
					</div>
				</div>
			</Section>
		</Page>
	)
}

export default ResetPassword
