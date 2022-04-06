import Head from 'next/head'
import Appbar from '../components/appbar'
import BottomNav from '../components/bottom-nav'

const Page = ({ title, children }) => (
	<>
		{title ? (
			<Head>
				<title>GNews Club | {title}</title>
			</Head>
		) : null}

		<Appbar />

		<main
			/**
			 * Padding top = `appbar` height
			 * Padding bottom = `bottom-nav` height
			 */
			className='mx-auto px-safe pt-20 pb-16 sm:pb-0 max-w-screen-xl'
		>
			<div className='p-6'>{children}</div>
		</main>

		<BottomNav />
	</>
)

export default Page
