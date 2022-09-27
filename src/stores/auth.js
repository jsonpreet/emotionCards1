import create from 'zustand'

export const useAuthStore = create((set) => ({
  isFetched: false,
  isSuccess: false,
  isLoading: false,
  isError: false,
  isLoggedIn: false,
  session: {},
  user: {},
  setFetched: (isFetched) => set({ isFetched }),
  setSuccess: (isSuccess) => set({ isSuccess }),
  setLoading: (isLoading) => set({ isLoading }),
  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  setError: (error) => set({ error }),
  setIsError: (isError) => set({ isError }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}))