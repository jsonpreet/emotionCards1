import { nanoid } from 'nanoid'
import create from 'zustand'

export const useDesignEditorStore = create((set) => ({
    pages: [
        {
        id: nanoid(),
        name: "First page",
        },
    ],
    isSuccess: false,
    isLoading: false,
    isError: false,
    error: '',
    addPage: (addPage) => set({ addPage }),
    removePage: (removePage) => set({ ...pages, removePage }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}))