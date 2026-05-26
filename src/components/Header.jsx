import { useAppStore } from '../store/useAppStore'
import { t } from '../lib/i18n'

export default function Header({ totalCount, filteredCount }) {
  const language = useAppStore((s) => s.language)

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__badge">{t(language, 'badge')}</div>
        <div className="header__counts">
          <span className="header__count">
            {t(language, 'results')}: <strong>{filteredCount}</strong>
          </span>
          <span className="header__count header__count--muted">
            / {totalCount}
          </span>
        </div>
      </div>

      <h1 className="header__title">
        <span>{t(language, 'title')}</span>
      </h1>
      <p className="header__subtitle">{t(language, 'subtitle')}</p>
    </header>
  )
}
