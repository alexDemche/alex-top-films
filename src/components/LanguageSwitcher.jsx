import { useAppStore } from '../store/useAppStore'
import { t } from '../lib/i18n'

export default function LanguageSwitcher() {
  const language = useAppStore((s) => s.language)
  const setLanguage = useAppStore((s) => s.setLanguage)

  return (
    <div className="lang-switch" role="group" aria-label={t(language, 'languageAria')}>
      <button
        type="button"
        className={`lang-switch__btn ${language === 'uk' ? 'is-active' : ''}`}
        onClick={() => setLanguage('uk')}
      >
        UA
      </button>
      <button
        type="button"
        className={`lang-switch__btn ${language === 'en' ? 'is-active' : ''}`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </div>
  )
}
