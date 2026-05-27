import { useAppStore } from '../store/useAppStore'
import { formatPagination, t } from '../lib/i18n'

function getPageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const pages = new Set([1, total, current, current - 1, current + 1])
  const sorted = [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b)

  const result = []
  for (let i = 0; i < sorted.length; i += 1) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push('ellipsis')
    }
    result.push(sorted[i])
  }

  return result
}

export default function Pagination({ page, totalPages, onPageChange }) {
  const language = useAppStore((s) => s.language)
  const pages = getPageNumbers(page, totalPages)

  return (
    <nav className="pagination" aria-label={t(language, 'paginationAria')}>
      <button
        type="button"
        className="pagination__btn"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        {t(language, 'paginationPrev')}
      </button>

      <div className="pagination__pages">
        {pages.map((item, index) =>
          item === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="pagination__ellipsis" aria-hidden>
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              className={`pagination__page ${item === page ? 'is-active' : ''}`}
              onClick={() => onPageChange(item)}
              aria-current={item === page ? 'page' : undefined}
            >
              {item}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        className="pagination__btn"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        {t(language, 'paginationNext')}
      </button>

      <p className="pagination__info">{formatPagination(language, page, totalPages)}</p>
    </nav>
  )
}
