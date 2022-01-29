import create from 'zustand'

const currentUser = {
      id: '',
      username: '',
      email: '',
  };

export const useStore = create((set) => ({
    currentUser,
    setCurrentUser: (user) => set({ currentUser: user}),
  }));