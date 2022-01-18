import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'

const links = [
	{ label: 'Story', href: '/story' },
	{ label: 'Recipes', href: '/recipes' },
	{ label: 'About us', href: '/about_us' },
]
interface Props {
	html?: HTMLHtmlElement
}

const Appbar = () => {
	const [darkMode, setdarkMode] = useState<boolean>(true)
	const router = useRouter()

	const changeDarkMode = () => {
		setdarkMode(!darkMode)
	}
	const remove = () => {
		return document.querySelector('html')?.classList.remove('dark')
	}
	const add = () => {
		return document.querySelector('html')?.classList.add('dark')
	}

	useEffect(() => {
		return () => {
			darkMode ? add() : remove()
		}
	}, [darkMode])

	return (
		<div className='pt-safe w-full bg-zinc-900 fixed top-0 left-0'>
			<header className='px-safe bg-zinc-100 border-b dark:bg-zinc-900 dark:border-zinc-800'>
				<div className='mx-auto px-6 max-w-screen-md h-20 flex items-center justify-between'>
					<Link href='/'>
						<a>
							<h1 className='font-medium'>Shin blog</h1>
						</a>
					</Link>

					<nav className='space-x-6 flex items-center'>
						<div className='hidden sm:block'>
							<div className='space-x-6 flex items-center'>
								{links.map(({ label, href }) => (
									<Link key={label} href={href}>
										<a
											className={`text-sm ${
												router.pathname === href
													? 'text-indigo-500 dark:text-indigo-400'
													: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
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
									>
										<div className='relative'>
											<input
												id='toogleA'
												type='checkbox'
												className='sr-only'
												onClick={() => changeDarkMode()}
											/>
											<div className='w-10 h-4 bg-gray-400 rounded-full shadow-inner'></div>
											<div className='dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition'></div>
										</div>
									</label>
								</div>
							</div>
						</div>

						<div
							title='Gluten Free'
							className='w-10 h-10 bg-zinc-200 dark:bg-zinc-800 bg-cover bg-center rounded-full shadow-inner'
							style={{
								backgroundImage:
									'url(https://images.unsplash.com/photo-1612480797665-c96d261eae09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80)',
							}}
						/>
					</nav>
				</div>
			</header>
		</div>
	)
}

export default Appbar