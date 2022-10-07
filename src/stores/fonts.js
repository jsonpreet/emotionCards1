import create from 'zustand'
import api from "@app/services/api"

export const useFontsStore = create((set) => ({
    fonts: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    error: '',
    setFonts: (addPage) => set({ addPage }),
    fetch: async () => {
        const fonts = await api.getFonts()
        set({ fonts: fonts })
    },
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}))