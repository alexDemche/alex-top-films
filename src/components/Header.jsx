import { useAppStore } from '../store/useAppStore'
import { formatFilmCount, t } from '../lib/i18n'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header({ totalCount, filteredCount }) {
  const language = useAppStore((s) => s.language)

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__badge">{t(language, 'badge')}</div>
        <LanguageSwitcher />
      </div>

      <h1 className="header__title">
        <button
          type="button"
          className="header__title-btn"
          onClick={() => window.location.reload()}
          aria-label={t(language, 'titleReload')}
        >
          {t(language, 'title')
            .split(' ')
            .map((word, index) => (
              <span
                key={word}
                className={`header__title-word header__title-word--${index + 1}`}
              >
                {word}
              </span>
            ))}
        </button>
      </h1>
      <p className="header__subtitle">{t(language, 'subtitle')}</p>

      <div className="header__counts">
        <span className="header__count">
          {t(language, 'results')}: <strong>{filteredCount}</strong>
        </span>
        <span className="header__count header__count--muted">
          / {totalCount} {formatFilmCount(language, totalCount)}
        </span>
      </div>
    </header>
  )
}
