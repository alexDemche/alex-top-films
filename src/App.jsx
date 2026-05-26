import { useEffect, useMemo } from 'react'
import { movies as allMovies } from './data/movies'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import MovieGrid from './components/MovieGrid'
import './App.css'
import { useAppStore } from './store/useAppStore'
import { filterMovies, getDecadeCounts } from './lib/filterMovies'

export default function App() {
  const language = useAppStore((s) => s.language)
  const search = useAppStore((s) => s.search)
  const genre = useAppStore((s) => s.genre)
  const decade = useAppStore((s) => s.decade)
  const sort = useAppStore((s) => s.sort)
  const topLimit = useAppStore((s) => s.topLimit)
  const highlightedId = useAppStore((s) => s.highlightedId)
  const setHighlightedId = useAppStore((s) => s.setHighlightedId)

  const genres = useMemo(
    () => [...new Set(allMovies.flatMap((m) => m.genre))].sort(),
    [],
  )

  const decadeCounts = useMemo(() => getDecadeCounts(allMovies), [])

  const baseFiltered = useMemo(
    () =>
      filterMovies(allMovies, {
        search,
        genre,
        decade,
        sort,
        topLimit: topLimit ? Number(topLimit) : null,
        language,
      }),
    [search, genre, decade, sort, topLimit, language],
  )

  function handleRandom() {
    const pool = baseFiltered.length ? baseFiltered : allMovies
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

    const fromAll = allMovies.filter((m) => m.id === highlightedId)
    return fromAll
  }, [baseFiltered, highlightedId])

  return (
    <div className="app">
      <div className="app__glow app__glow--1" aria-hidden />
      <div className="app__glow app__glow--2" aria-hidden />

      <main className="app__main">
        <Header totalCount={allMovies.length} filteredCount={displayedMovies.length} />
        <SearchBar />
        <FilterBar genres={genres} decadeCounts={decadeCounts} onRandom={handleRandom} />
        <MovieGrid movies={displayedMovies} highlightedId={highlightedId} />
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
