import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useStore } from '../store'
import { useEffect, useState } from 'react'

const links = [
	{ label: 'Home', href: '/' },
	{ label: 'News', href: '/news' },
	// { label: 'Events', href: '/events' },
	{ label: 'About us', href: '/about_us' },
	{ label: 'Login', href: '/login' },
]

const Appbar = () => {
	const router = useRouter()

	return (
		<div className='pt-safe w-full bg-white fixed top-0 left-0 z-50'>
			<header className='px-safe border-b bg-white light:border-zinc-800'>
				<div className='mx-auto px-6 max-w-screen-xl h-20 flex items-center justify-between'>
					<Link href='/'>
						<a>
							{/* <h1 className='font-medium'>Vince Blog</h1> */}
							<Image
								src="/images/logo.png"
								layout="fixed"
								width={160}
								height={45}
								alt="Logo"
							/>
						</a>
					</Link>

					<nav className='space-x-6 flex items-center'>
						<div className='hidden sm:block'>
							<div className='space-x-6 items-center'>
								{links.map(({ label, href }) => (
									<Link key={label} href={href}>
										<a
											className={`text-sm ${
												router.pathname === href
													? 'text-yellow-500 light:text-indigo-400'
													: 'text-zinc-600 hover:text-zinc-900 light:text-zinc-400 light:hover:text-zinc-50'
											}`}
										>
											{label}
										</a>
									</Link>
								))}
								<div className='flex items-center justify-center'>
									<label
										htmlFor='toogleA'
										className='flex items-center cursor-pointer'
									></label>
								</div>
							</div>
						</div>
					</nav>
				</div>
			</header>
		</div>
	)
}

export default Appbar
