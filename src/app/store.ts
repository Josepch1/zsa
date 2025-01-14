import { create } from 'zustand'

interface Store {
  message: string | null
  setMessage: (message: string) => void
  resetMessage: () => void
}

export const useStore = create<Store>((set) => ({
  message: null,
  setMessage: (message) => set({ message }),
  resetMessage: () => set({ message: null }),
}))