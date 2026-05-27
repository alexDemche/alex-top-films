import { useEffect, useRef } from 'react'
import MovieCard from './MovieCard'
import { useAppStore } from '../store/useAppStore'
import { t } from '../lib/i18n'

export default function MovieGrid({ movies, highlightedId, hasMore, onLoadMore }) {
  const language = useAppStore((s) => s.language)
  const sentinelRef = useRef(null)

  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onLoadMore()
        }
      },
      { rootMargin: '240px 0px' },
    )

    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [hasMore, onLoadMore])

  if (movies.length === 0) {
    return <p className="empty-state">{t(language, 'empty')}</p>
  }

  return (
    <>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isHighlighted={movie.id === highlightedId}
          />
        ))}
      </div>
      {hasMore && (
        <div className="movie-grid__sentinel" ref={sentinelRef}>
          <span>{t(language, 'loadingMore')}</span>
        </div>
      )}
    </>
  )
}
