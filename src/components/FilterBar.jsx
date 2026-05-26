import { useAppStore } from '../store/useAppStore'
import { ALL_DECADES, TOP_LIMITS } from '../lib/constants'
import { formatDecade, t } from '../lib/i18n'

export default function FilterBar({ genres, decadeCounts, onRandom }) {
  const language = useAppStore((s) => s.language)
  const genre = useAppStore((s) => s.genre)
  const decade = useAppStore((s) => s.decade)
  const sort = useAppStore((s) => s.sort)
  const topLimit = useAppStore((s) => s.topLimit)

  const setGenre = useAppStore((s) => s.setGenre)
  const setDecade = useAppStore((s) => s.setDecade)
  const setSort = useAppStore((s) => s.setSort)
  const setTopLimit = useAppStore((s) => s.setTopLimit)
  const resetFilters = useAppStore((s) => s.resetFilters)

  const sortDisabled = Boolean(topLimit)

  const SORT_OPTIONS = [
    { value: 'rating-desc', label: t(language, 'sort_rating') },
    { value: 'imdb-desc', label: t(language, 'sort_imdb') },
    { value: 'year-desc', label: t(language, 'sort_year_desc') },
    { value: 'year-asc', label: t(language, 'sort_year_asc') },
    { value: 'title-asc', label: t(language, 'sort_title') },
  ]

  const TOP_OPTIONS = [
    { value: '', label: t(language, 'top_all') },
    ...TOP_LIMITS.map((n) => ({
      value: String(n),
      label: t(language, `top_${n}`),
    })),
  ]

  return (
    <div className="filter-bar">
      <div className="filter-bar__row">
        <select
          className="filter-bar__select"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          aria-label={t(language, 'genreAria')}
        >
          <option value="">{t(language, 'allGenres')}</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          className="filter-bar__select"
          value={decade}
          onChange={(e) => setDecade(e.target.value)}
          aria-label={t(language, 'decadeAria')}
        >
          <option value="">{t(language, 'allDecades')}</option>
          {ALL_DECADES.map((d) => {
            const count = decadeCounts[d] ?? 0
            return (
              <option key={d} value={`${d}s`} disabled={count === 0}>
                {formatDecade(language, d)}
                {count === 0 ? ' —' : ''}
              </option>
            )
          })}
        </select>

        <select
          className="filter-bar__select"
          value={topLimit}
          onChange={(e) => setTopLimit(e.target.value)}
          aria-label={t(language, 'topAria')}
        >
          {TOP_OPTIONS.map((opt) => (
            <option key={opt.value || 'all'} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          className="filter-bar__select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label={t(language, 'sortAria')}
          disabled={sortDisabled}
          title={sortDisabled ? t(language, 'sortDisabledHint') : undefined}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-bar__actions">
        <button
          type="button"
          className="filter-bar__btn filter-bar__btn--accent"
          onClick={onRandom}
        >
          {t(language, 'randomFilm')}
        </button>
        <button type="button" className="filter-bar__btn" onClick={resetFilters}>
          {t(language, 'reset')}
        </button>
      </div>
    </div>
  )
}
