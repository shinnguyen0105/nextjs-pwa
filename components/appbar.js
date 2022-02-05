import Link from 'next/link'
import { useRouter } from 'next/router'
import { useStore } from '../store'
import { signOut } from 'firebase/auth'
import { auth } from '../shared/firebase'
import { useEffect, useState } from 'react'

const links = [
	{ label: 'Stories', href: '/stories' },
	{ label: 'Events', href: '/events' },
	{ label: 'About us', href: '/about_us' },
]

const Appbar = () => {
	const router = useRouter()
	const [isLoggedIn, setLogIn] = useState(false)
	const currentUser = useStore((state) => state.currentUser)
	const [displayName, setDisplayName] = useState('')
	const handleLogOut = () => {
		try {
			signOut(auth)
			setLogIn(false)
		} catch (e) {
			console.log(e)
		}
	}
	useEffect(() => {
		if (currentUser.id != '') {
			setLogIn(true)
			if (currentUser.username) {
				setDisplayName(currentUser.username.split(' ')[0])
			} else {
				setDisplayName(currentUser.email.split('@')[0])
			}
		}
	}, [currentUser.id])

	return (
		<div className='pt-safe w-full bg-zinc-900 fixed top-0 left-0'>
			<header className='px-safe bg-zinc-100 border-b dark:bg-zinc-900 dark:border-zinc-800'>
				<div className='mx-auto px-6 max-w-screen-md h-20 flex items-center justify-between'>
					<Link href='/'>
						<a>
							<h1 className='font-medium'>Vince Blog</h1>
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
									></label>
								</div>
							</div>
						</div>
						{isLoggedIn ? (
							<>
								<div
									title='Gluten Free'
									className='w-10 h-10 bg-zinc-200 dark:bg-zinc-800 bg-cover bg-center rounded-full shadow-inner'
									style={{
										backgroundImage: currentUser.photoURL
											? `url(${currentUser.photoURL})`
											: 'url(https://images.unsplash.com/photo-1612480797665-c96d261eae09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80)',
									}}
								/>
								<Link href='/profile'>
									<button className='btn btn-blue'>Hi {displayName}!</button>
								</Link>
								<button className='btn btn-blue' onClick={handleLogOut}>
									Logout
								</button>
							</>
						) : (
							<>
								<Link href='/login'>
									<button className='btn btn-blue'>Login</button>
								</Link>
								<Link href='/register'>
									<button className='btn btn-blue'>Register</button>
								</Link>
							</>
						)}
					</nav>
				</div>
			</header>
		</div>
	)
}

export default Appbar
