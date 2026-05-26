import { useAppStore } from '../store/useAppStore'
import { t } from '../lib/i18n'

export default function SearchBar() {
  const language = useAppStore((s) => s.language)
  const search = useAppStore((s) => s.search)
  const setSearch = useAppStore((s) => s.setSearch)

  return (
    <div className="search-bar">
      <div className="search-bar__wrap">
        <svg className="search-bar__icon" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          className="search-bar__input"
          placeholder={t(language, 'searchPlaceholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label={t(language, 'searchAria')}
          enterKeyHint="search"
        />
        {search && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={() => setSearch('')}
            aria-label={t(language, 'clearSearch')}
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}
