import { useEffect, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { t } from '../lib/i18n'

export default function MovieCard({ movie, isHighlighted }) {
  const [imgError, setImgError] = useState(false)
  const [copied, setCopied] = useState(false)
  const language = useAppStore((s) => s.language)
  const mediaType = movie.mediaType === 'series' ? 'series' : 'movie'

  useEffect(() => {
    setImgError(false)
  }, [movie.id, movie.poster])

  useEffect(() => {
    if (!copied) return
    const timeoutId = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(timeoutId)
  }, [copied])

  async function handleShare() {
    const shareUrl = new URL(window.location.href)
    shareUrl.searchParams.set('film', String(movie.id))
    shareUrl.hash = ''
    const url = shareUrl.toString()
    const shareTitle = `${movie.title} (${movie.year})`
    const shareText = `${movie.title} / ${movie.originalTitle}`

    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url })
        return
      } catch (error) {
        if (error?.name === 'AbortError') return
      }
    }

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        return
      } catch (error) {
        // ignore clipboard errors and fallback to opening Telegram share
      }
    }

    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`
    window.open(telegramUrl, '_blank', 'noopener,noreferrer')
  }

  const genresMarkup = movie.genre.map((g, index) => (
    <span key={`${g}-${index}`} className="movie-card__genre-item">
      <span className="movie-card__genre">{g}</span>
      {index < movie.genre.length - 1 && <span className="movie-card__genre-sep">|</span>}
    </span>
  ))

  return (
    <article
      id={`movie-${movie.id}`}
      className={`movie-card ${isHighlighted ? 'movie-card--highlighted' : ''}`}
      style={{ '--accent': movie.accent }}
    >
      <div className="movie-card__poster-col">
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
        </div>
        <button
          type="button"
          className="movie-card__share movie-card__share--poster"
          onClick={handleShare}
        >
          {copied ? t(language, 'shareCopied') : t(language, 'share')}
        </button>
      </div>

      <div className="movie-card__body">
        <div className="movie-card__topline">
          <div className="movie-card__meta">
            <span className="movie-card__year">{movie.year}</span>
            <span className={`movie-card__type movie-card__type--${mediaType}`}>
              {t(language, mediaType === 'series' ? 'media_series' : 'media_movie')}
            </span>
            <span className="movie-card__genres">{genresMarkup}</span>
          </div>
          <div className="movie-card__ratings">
            <div className="movie-card__rating" title={t(language, 'myRating')}>
              <span>{movie.rating}</span>
              <small>/10</small>
            </div>
            {typeof movie.imdbRating === 'number' && (
              <div
                className="movie-card__rating movie-card__rating--imdb"
                title={t(language, 'imdb')}
              >
                <span>{movie.imdbRating.toFixed(1)}</span>
                <small>IMDb</small>
              </div>
            )}
          </div>
        </div>

        <h2 className="movie-card__title">{movie.title}</h2>
        <p className="movie-card__original">{movie.originalTitle}</p>
        <p className="movie-card__director">{movie.director}</p>
        <button
          type="button"
          className="movie-card__share movie-card__share--body"
          onClick={handleShare}
        >
          {copied ? t(language, 'shareCopied') : t(language, 'share')}
        </button>
      </div>
    </article>
  )
}
