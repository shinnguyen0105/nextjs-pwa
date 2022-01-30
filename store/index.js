import create from 'zustand'

const currentUser = {
      id: '',
      username: '',
      email: '',
      photoURL: ''
  };

export const useStore = create((set) => ({
    currentUser,
    setCurrentUser: (user) => set({ currentUser: user}),
  }));