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
        <span>{t(language, 'title')}</span>
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
