import create from 'zustand'

export type User = {
	id: string,
	username: string,
	email: string,
	photoURL: string
}

type UserAction = {
	setCurrentUser: (user: User) => void
}

const initUser: User = {
	id: '',
	username: '',
	email: '',
	photoURL: ''
}

type UserState = {
	currentUser: User
}
type UserStore = UserState & UserAction

export const useStore = create<UserStore>((set) => ({
	currentUser: initUser,
	setCurrentUser: (user: User) => set({ currentUser: user })
}))
