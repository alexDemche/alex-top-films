import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { t } from '../lib/i18n'

export default function MovieCard({ movie }) {
  const [imgError, setImgError] = useState(false)
  const language = useAppStore((s) => s.language)

  return (
    <article
      className="movie-card"
      style={{ '--accent': movie.accent }}
    >
      <div className="movie-card__poster-wrap">
        {!imgError ? (
          <img
            src={movie.poster}
            alt={`${movie.title} poster`}
            className="movie-card__poster"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="movie-card__poster-fallback" aria-hidden>
            <span>{movie.title.charAt(0)}</span>
          </div>
        )}
        <div className="movie-card__ratings">
          <div className="movie-card__rating" title={t(language, 'myRating')}>
            <span>{movie.rating}</span>
            <small>/10</small>
          </div>
          {typeof movie.imdbRating === 'number' && (
            <div className="movie-card__rating movie-card__rating--imdb" title={t(language, 'imdb')}>
              <span>{movie.imdbRating.toFixed(1)}</span>
              <small>IMDb</small>
            </div>
          )}
        </div>
      </div>

      <div className="movie-card__body">
        <div className="movie-card__meta">
          <span className="movie-card__year">{movie.year}</span>
          {movie.genre.map((g) => (
            <span key={g} className="movie-card__genre">
              {g}
            </span>
          ))}
        </div>

        <h2 className="movie-card__title">{movie.title}</h2>
        <p className="movie-card__original">{movie.originalTitle}</p>
        <p className="movie-card__director">{movie.director}</p>
        <p className="movie-card__note">{movie.note}</p>
      </div>
    </article>
  )
}
