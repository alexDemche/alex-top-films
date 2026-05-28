import { useEffect, useMemo, useState } from 'react'
import { movies as localMovies } from './data/movies'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import MovieGrid from './components/MovieGrid'
import Pagination from './components/Pagination'
import './App.css'
import { useAppStore } from './store/useAppStore'
import { filterMovies, getDecadeCounts } from './lib/filterMovies'
import { t } from './lib/i18n'
import { fetchMoviesFromSheet } from './lib/sheets'

export default function App() {
  const PAGE_SIZE = 12
  const defaultTitle = 'alex top films'
  const defaultDescription =
    'Особиста колекція улюблених фільмів і серіалів з рейтингами, постерами та швидким пошуком.'
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
  const [page, setPage] = useState(1)
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

  useEffect(() => {
    if (!moviesData.length) return

    const params = new URLSearchParams(window.location.search)
    const sharedFilmId = Number(params.get('film'))
    if (!Number.isFinite(sharedFilmId)) return

    const sharedMovie = moviesData.find((movie) => movie.id === sharedFilmId)
    if (sharedMovie) setHighlightedId(sharedMovie.id)
  }, [moviesData, setHighlightedId])

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
    if (highlightedId && !moviesData.some((m) => m.id === highlightedId)) {
      setHighlightedId(null)
    }
  }, [highlightedId, moviesData, setHighlightedId])

  const displayedMovies = useMemo(() => {
    if (!highlightedId) return baseFiltered
    const fromBase = baseFiltered.filter((m) => m.id === highlightedId)
    if (fromBase.length > 0) return fromBase

    const fromAll = moviesData.filter((m) => m.id === highlightedId)
    return fromAll
  }, [baseFiltered, highlightedId, moviesData])

  const highlightedMovie = useMemo(
    () => moviesData.find((movie) => movie.id === highlightedId),
    [highlightedId, moviesData],
  )

  useEffect(() => {
    const title = highlightedMovie
      ? `${highlightedMovie.title} (${highlightedMovie.year}) | alex top films`
      : defaultTitle
    const description = highlightedMovie
      ? `${highlightedMovie.title} / ${highlightedMovie.originalTitle}. Мій рейтинг: ${highlightedMovie.rating}/10, IMDb: ${highlightedMovie.imdbRating.toFixed(1)}.`
      : defaultDescription

    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', window.location.href)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description)
  }, [defaultDescription, highlightedMovie])

  useEffect(() => {
    setPage(1)
  }, [displayedMovies])

  const totalPages = Math.max(1, Math.ceil(displayedMovies.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)

  const paginatedMovies = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return displayedMovies.slice(start, start + PAGE_SIZE)
  }, [displayedMovies, currentPage])

  const showPagination = !highlightedId && totalPages > 1

  function handlePageChange(nextPage) {
    const clamped = Math.max(1, Math.min(nextPage, totalPages))
    setPage(clamped)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
          <>
            <MovieGrid movies={paginatedMovies} highlightedId={highlightedId} />
            {showPagination && (
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
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
