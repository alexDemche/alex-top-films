function parseCsvLine(line) {
  const result = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i]
    const next = line[i + 1]

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"'
        i += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
      continue
    }

    current += char
  }

  result.push(current.trim())
  return result
}

function toNumber(value, fallback = 0) {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

function normalizeMovie(row, index) {
  const mediaType = row.mediaType === 'series' ? 'series' : 'movie'
  const genres = (row.genre || '')
    .split(',')
    .map((g) => g.trim())
    .filter(Boolean)

  return {
    id: toNumber(row.id, index + 1),
    mediaType,
    title: row.title || 'Untitled',
    originalTitle: row.originalTitle || row.title || 'Untitled',
    year: toNumber(row.year, 2000),
    director: row.director || 'Unknown',
    genre: genres.length > 0 ? genres : ['Drama'],
    rating: toNumber(row.rating, 0),
    imdbRating: toNumber(row.imdbRating, 0),
    note: row.note || '',
    poster: row.poster || '',
    accent: row.accent || '#e8b84a',
  }
}

export async function fetchMoviesFromSheet(csvUrl) {
  const response = await fetch(csvUrl, { cache: 'no-store' })
  if (!response.ok) {
    throw new Error(`Sheet request failed: ${response.status}`)
  }

  const text = await response.text()
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length < 2) return []

  const headers = parseCsvLine(lines[0])
  const movies = []

  for (let i = 1; i < lines.length; i += 1) {
    const values = parseCsvLine(lines[i])
    const row = {}

    headers.forEach((header, idx) => {
      row[header] = values[idx] ?? ''
    })

    const activeValue = String(row.active || '').toLowerCase()
    const isInactive = activeValue === 'false' || activeValue === '0' || activeValue === 'no'
    if (isInactive) continue

    movies.push(normalizeMovie(row, i))
  }

  return movies
}

