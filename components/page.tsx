import Head from 'next/head'
import Appbar from '../components/appbar'
import BottomNav from '../components/bottom-nav'
import { ReactNode } from 'react'

type PageProps = {
	title?: string,
	children: ReactNode
}
const Page = ({ title, children }: PageProps) => (
	<>
		{title ? (
			<Head>
				<title>Vince Blog | {title}</title>
			</Head>
		) : null}

		<Appbar />

		<main
			/**
			 * Padding top = `appbar` height
			 * Padding bottom = `bottom-nav` height
			 */
			className='mx-auto px-safe pt-20 pb-16 sm:pb-0 max-w-screen-md'
		>
			<div className='p-6'>{children}</div>
		</main>

		<BottomNav />
	</>
)

export default Page
