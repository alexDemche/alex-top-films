import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set) => ({
      language: 'uk',
      search: '',
      genre: '',
      mediaType: '',
      decade: '',
      sort: 'rating-desc',
      topLimit: '',
      filtersOpen: false,
      highlightedId: null,
      setLanguage: (language) => set({ language }),
      setSearch: (search) => set({ search }),
      setGenre: (genre) => set({ genre }),
      setMediaType: (mediaType) => set({ mediaType }),
      setDecade: (decade) => set({ decade }),
      setSort: (sort) => set({ sort }),
      setTopLimit: (topLimit) => set({ topLimit }),
      setFiltersOpen: (filtersOpen) => set({ filtersOpen }),
      setHighlightedId: (highlightedId) => set({ highlightedId }),
      resetFilters: () =>
        set({
          search: '',
          genre: '',
          mediaType: '',
          decade: '',
          sort: 'rating-desc',
          topLimit: '',
          highlightedId: null,
        }),
    }),
    {
      name: 'alex-top-films',
      version: 3,
      migrate: (persistedState, version) => {
        if (!persistedState || typeof persistedState !== 'object') return persistedState
        if (version < 3) {
          return {
            ...persistedState,
            filtersOpen: false,
          }
        }
        return persistedState
      },
      partialize: (state) => ({
        language: state.language,
        search: state.search,
        genre: state.genre,
        mediaType: state.mediaType,
        decade: state.decade,
        sort: state.sort,
        topLimit: state.topLimit,
        filtersOpen: state.filtersOpen,
      }),
    },
  ),
)
