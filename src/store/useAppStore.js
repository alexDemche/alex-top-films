import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set) => ({
      language: 'uk',
      search: '',
      genre: '',
      decade: '',
      sort: 'rating-desc',
      topLimit: '',
      highlightedId: null,
      setLanguage: (language) => set({ language }),
      setSearch: (search) => set({ search }),
      setGenre: (genre) => set({ genre }),
      setDecade: (decade) => set({ decade }),
      setSort: (sort) => set({ sort }),
      setTopLimit: (topLimit) => set({ topLimit }),
      setHighlightedId: (highlightedId) => set({ highlightedId }),
      resetFilters: () =>
        set({
          search: '',
          genre: '',
          decade: '',
          sort: 'rating-desc',
          topLimit: '',
          highlightedId: null,
        }),
    }),
    {
      name: 'alex-top-films',
      version: 2,
      partialize: (state) => ({
        language: state.language,
        search: state.search,
        genre: state.genre,
        decade: state.decade,
        sort: state.sort,
        topLimit: state.topLimit,
      }),
    },
  ),
)
