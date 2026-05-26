import { useMemo } from 'react'
import { movies as allMovies } from './data/movies'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import MovieGrid from './components/MovieGrid'
import './App.css'
import { useAppStore } from './store/useAppStore'

function sortMovies(list, sort) {
  const sorted = [...list]
  switch (sort) {
    case 'year-desc':
      return sorted.sort((a, b) => b.year - a.year)
    case 'year-asc':
      return sorted.sort((a, b) => a.year - b.year)
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
  }
  return sorted.sort((a, b) => b.rating - a.rating)
}

export default function App() {
  const language = useAppStore((s) => s.language)
  const search = useAppStore((s) => s.search)
  const genre = useAppStore((s) => s.genre)
  const decade = useAppStore((s) => s.decade)
  const sort = useAppStore((s) => s.sort)

  const genres = useMemo(
    () => [...new Set(allMovies.flatMap((m) => m.genre))].sort(),
    [],
  )

  const decades = useMemo(() => {
    const starts = new Set(allMovies.map((m) => Math.floor(m.year / 10) * 10))
    return [...starts].sort((a, b) => a - b)
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = allMovies

    if (genre) {
      list = list.filter((m) => m.genre.includes(genre))
    }

    if (decade) {
      const decadeStart = Number.parseInt(decade.slice(0, 4), 10)
      if (!Number.isNaN(decadeStart)) {
        list = list.filter((m) => Math.floor(m.year / 10) * 10 === decadeStart)
      }
    }

    if (q) {
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.originalTitle.toLowerCase().includes(q) ||
          m.director.toLowerCase().includes(q),
      )
    }

    const sorted = sortMovies(list, sort)
    if (sort === 'title-asc') {
      const locale = language === 'en' ? 'en' : 'uk'
      return [...sorted].sort((a, b) => a.title.localeCompare(b.title, locale))
    }
    return sorted
  }, [search, genre, decade, sort, language])

  return (
    <div className="app">
      <div className="app__glow app__glow--1" aria-hidden />
      <div className="app__glow app__glow--2" aria-hidden />

      <main className="app__main">
        <Header totalCount={allMovies.length} filteredCount={filtered.length} />
        <FilterBar genres={genres} decades={decades} />
        <MovieGrid movies={filtered} />
      </main>

      <footer className="footer">
        <p>
          React ·{' '}
          <a
            href="https://github.com/alex/alex-top-films"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  )
}
