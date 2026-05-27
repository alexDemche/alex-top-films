import { useEffect, useMemo, useState } from 'react'
import { movies as localMovies } from './data/movies'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import MovieGrid from './components/MovieGrid'
import './App.css'
import { useAppStore } from './store/useAppStore'
import { filterMovies, getDecadeCounts } from './lib/filterMovies'
import { t } from './lib/i18n'
import { fetchMoviesFromSheet } from './lib/sheets'

export default function App() {
  const PAGE_SIZE = 24
  const language = useAppStore((s) => s.language)
  const search = useAppStore((s) => s.search)
  const genre = useAppStore((s) => s.genre)
  const mediaType = useAppStore((s) => s.mediaType)
  const decade = useAppStore((s) => s.decade)
  const sort = useAppStore((s) => s.sort)
  const topLimit = useAppStore((s) => s.topLimit)
  const filtersOpen = useAppStore((s) => s.filtersOpen)
  const highlightedId = useAppStore((s) => s.highlightedId)
  const setFiltersOpen = useAppStore((s) => s.setFiltersOpen)
  const setHighlightedId = useAppStore((s) => s.setHighlightedId)
  const sheetCsvUrl = import.meta.env.VITE_SHEET_CSV_URL
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [moviesData, setMoviesData] = useState(() => (sheetCsvUrl ? [] : localMovies))
  const [moviesLoading, setMoviesLoading] = useState(Boolean(sheetCsvUrl))

  useEffect(() => {
    if (!sheetCsvUrl) return

    let cancelled = false
    setMoviesLoading(true)

    fetchMoviesFromSheet(sheetCsvUrl)
      .then((sheetMovies) => {
        if (cancelled) return
        setMoviesData(sheetMovies.length > 0 ? sheetMovies : localMovies)
      })
      .catch((error) => {
        if (cancelled) return
        console.warn('Failed to load movies from Google Sheets, using local data.', error)
        setMoviesData(localMovies)
      })
      .finally(() => {
        if (!cancelled) setMoviesLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [sheetCsvUrl])

  const genres = useMemo(
    () => [...new Set(moviesData.flatMap((m) => m.genre))].sort(),
    [moviesData],
  )

  const decadeCounts = useMemo(() => getDecadeCounts(moviesData), [moviesData])

  const baseFiltered = useMemo(
    () =>
      filterMovies(moviesData, {
        search,
        genre,
        mediaType,
        decade,
        sort,
        topLimit: topLimit ? Number(topLimit) : null,
        language,
      }),
    [moviesData, search, genre, mediaType, decade, sort, topLimit, language],
  )

  function handleRandom() {
    if (!moviesData.length) return
    const pool = baseFiltered.length ? baseFiltered : moviesData
    const randomMovie = pool[Math.floor(Math.random() * pool.length)]
    setHighlightedId(randomMovie.id)
  }

  useEffect(() => {
    // Якщо фільтри дали порожній список, Random забирає з `allMovies`,
    // тому не очищаємо highlight одразу.
    if (
      highlightedId &&
      baseFiltered.length > 0 &&
      !baseFiltered.some((m) => m.id === highlightedId)
    ) {
      setHighlightedId(null)
    }
  }, [baseFiltered, highlightedId, setHighlightedId])

  const displayedMovies = useMemo(() => {
    if (!highlightedId) return baseFiltered
    const fromBase = baseFiltered.filter((m) => m.id === highlightedId)
    if (fromBase.length > 0) return fromBase

    const fromAll = moviesData.filter((m) => m.id === highlightedId)
    return fromAll
  }, [baseFiltered, highlightedId, moviesData])

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [displayedMovies])

  const visibleMovies = useMemo(
    () => displayedMovies.slice(0, visibleCount),
    [displayedMovies, visibleCount],
  )

  const hasMore = visibleMovies.length < displayedMovies.length

  function handleLoadMore() {
    if (!hasMore) return
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, displayedMovies.length))
  }

  return (
    <div className="app">
      <div className="app__glow app__glow--1" aria-hidden />
      <div className="app__glow app__glow--2" aria-hidden />

      <main className="app__main">
        <Header totalCount={moviesData.length} filteredCount={displayedMovies.length} />
        <SearchBar />
        <button
          type="button"
          className={`filters-toggle ${filtersOpen ? 'is-open' : ''}`}
          onClick={() => setFiltersOpen(!filtersOpen)}
          aria-expanded={filtersOpen}
          aria-controls="filters-panel"
        >
          <span>{t(language, 'filtersToggle')}</span>
          <small>{filtersOpen ? t(language, 'filtersHide') : t(language, 'filtersShow')}</small>
        </button>
        {filtersOpen && (
          <div id="filters-panel">
            <FilterBar genres={genres} decadeCounts={decadeCounts} onRandom={handleRandom} />
          </div>
        )}
        {moviesLoading ? (
          <p className="loading-state">{t(language, 'loadingData')}</p>
        ) : (
          <MovieGrid
            movies={visibleMovies}
            highlightedId={highlightedId}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
          />
        )}
      </main>

      <footer className="footer">
        <p>
          React ·{' '}
          <a
            href="https://github.com/alexDemche/alex-top-films"
            target="_blank"
            rel="noopener noreferrer"
          >
            alexDemche
          </a>
        </p>
      </footer>
    </div>
  )
}
