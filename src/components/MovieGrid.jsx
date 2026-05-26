import MovieCard from './MovieCard'
import { useAppStore } from '../store/useAppStore'
import { t } from '../lib/i18n'

export default function MovieGrid({ movies }) {
  const language = useAppStore((s) => s.language)

  if (movies.length === 0) {
    return (
      <p className="empty-state">
        {t(language, 'empty')}
      </p>
    )
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
