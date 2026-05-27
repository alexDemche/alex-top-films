export function sortMovies(list, sort, language) {
  const sorted = [...list]
  switch (sort) {
    case 'year-desc':
      return sorted.sort((a, b) => b.year - a.year)
    case 'year-asc':
      return sorted.sort((a, b) => a.year - b.year)
    case 'title-asc': {
      const locale = language === 'en' ? 'en' : 'uk'
      return sorted.sort((a, b) => a.title.localeCompare(b.title, locale))
    }
    case 'imdb-desc':
      return sorted.sort((a, b) => (b.imdbRating ?? 0) - (a.imdbRating ?? 0))
    default:
      return sorted.sort((a, b) => b.rating - a.rating)
  }
}

export function filterMovies(movies, { search, genre, mediaType, decade, sort, topLimit, language }) {
  const q = search.trim().toLowerCase()
  let list = movies

  if (mediaType) {
    list = list.filter((m) => (m.mediaType ?? 'movie') === mediaType)
  }

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
        m.director.toLowerCase().includes(q),
    )
  }

  if (topLimit) {
    return [...list]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, topLimit)
  }

  return sortMovies(list, sort, language)
}

export function getDecadeCounts(movies) {
  const counts = {}
  for (const movie of movies) {
    const decade = Math.floor(movie.year / 10) * 10
    counts[decade] = (counts[decade] ?? 0) + 1
  }
  return counts
}
