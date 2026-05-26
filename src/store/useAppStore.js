import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set) => ({
      language: 'uk', // 'uk' | 'en'
      search: '',
      genre: '',
      decade: '', // e.g. '1990s'
      sort: 'rating-desc',
      setLanguage: (language) => set({ language }),
      setSearch: (search) => set({ search }),
      setGenre: (genre) => set({ genre }),
      setDecade: (decade) => set({ decade }),
      setSort: (sort) => set({ sort }),
      resetFilters: () =>
        set({
          search: '',
          genre: '',
          decade: '',
          sort: 'rating-desc',
        }),
    }),
    {
      name: 'alex-top-films',
      version: 1,
      partialize: (state) => ({
        language: state.language,
        search: state.search,
        genre: state.genre,
        decade: state.decade,
        sort: state.sort,
      }),
    },
  ),
)

