import { useAppStore } from '../store/useAppStore'
import { formatDecade, t } from '../lib/i18n'

export default function FilterBar({ genres, decades }) {
  const language = useAppStore((s) => s.language)
  const search = useAppStore((s) => s.search)
  const genre = useAppStore((s) => s.genre)
  const decade = useAppStore((s) => s.decade)
  const sort = useAppStore((s) => s.sort)

  const setLanguage = useAppStore((s) => s.setLanguage)
  const setSearch = useAppStore((s) => s.setSearch)
  const setGenre = useAppStore((s) => s.setGenre)
  const setDecade = useAppStore((s) => s.setDecade)
  const setSort = useAppStore((s) => s.setSort)
  const resetFilters = useAppStore((s) => s.resetFilters)

  const SORT_OPTIONS = [
    { value: 'rating-desc', label: t(language, 'sort_rating') },
    { value: 'year-desc', label: t(language, 'sort_year_desc') },
    { value: 'year-asc', label: t(language, 'sort_year_asc') },
    { value: 'title-asc', label: t(language, 'sort_title') },
  ]

  return (
    <div className="filter-bar">
      <div className="filter-bar__search-wrap">
        <svg className="filter-bar__icon" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          className="filter-bar__search"
          placeholder={t(language, 'searchPlaceholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label={t(language, 'searchAria')}
        />
      </div>

      <div className="filter-bar__controls">
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
          {decades.map((d) => (
            <option key={d} value={`${d}s`}>
              {formatDecade(language, d)}
            </option>
          ))}
        </select>

        <select
          className="filter-bar__select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label={t(language, 'sortAria')}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="filter-bar__lang" role="group" aria-label="Language">
          <button
            type="button"
            className={`filter-bar__lang-btn ${language === 'uk' ? 'is-active' : ''}`}
            onClick={() => setLanguage('uk')}
          >
            UA
          </button>
          <button
            type="button"
            className={`filter-bar__lang-btn ${language === 'en' ? 'is-active' : ''}`}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
        </div>

        <button type="button" className="filter-bar__reset" onClick={resetFilters}>
          {t(language, 'reset')}
        </button>
      </div>
    </div>
  )
}
