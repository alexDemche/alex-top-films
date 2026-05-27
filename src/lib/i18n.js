const STRINGS = {
  uk: {
    badge: 'film diary',
    title: 'alex top films',
    titleReload: 'Перезавантажити сайт',
    subtitle: 'Особиста колекція фільмів і серіалів, які залишились в памʼяті.',
    searchPlaceholder: 'Назва або режисер',
    searchAria: 'Пошук фільмів',
    clearSearch: 'Очистити пошук',
    allGenres: 'Усі жанри',
    allDecades: 'Усі роки',
    mediaAria: 'Фільтр за типом контенту',
    media_all: 'Усе',
    media_movie: 'Фільми',
    media_series: 'Серіали',
    genreAria: 'Фільтр за жанром',
    decadeAria: 'Фільтр за роками',
    sortAria: 'Сортування',
    topAria: 'Топ за рейтингом',
    top_all: 'Усі',
    top_10: 'Топ 10',
    top_20: 'Топ 20',
    top_50: 'Топ 50',
    top_100: 'Топ 100',
    top_250: 'Топ 250',
    sort_rating: 'За моїм рейтингом',
    sort_imdb: 'За рейтингом IMDb',
    sort_year_desc: 'Новіші',
    sort_year_asc: 'Старіші',
    sort_title: 'А–Я',
    sortDisabledHint: 'Сортування вимкнено при активному Топ N',
    empty: 'Нічого не знайдено. Спробуй інший пошук або фільтри.',
    myRating: 'Мій рейтинг',
    imdb: 'IMDb',
    reset: 'Скинути',
    random: 'Рандомний фільм',
    randomFilm: 'Рандомний фільм',
    randomAria: 'Показати рандомний фільм',
    clearRandomFilm: 'Скинути рандомний фільм',
    filtersToggle: 'Фільтри',
    filtersShow: 'Показати фільтри',
    filtersHide: 'Сховати фільтри',
    loadingMore: 'Завантажую ще...',
    loadingData: 'Завантажую список...',
    paginationAria: 'Пагінація',
    paginationPrev: 'Попередня',
    paginationNext: 'Наступна',
    paginationInfo: 'Сторінка {current} з {total}',
    results: 'Знайдено',
    films_one: 'фільм',
    films_few: 'фільми',
    films_many: 'фільмів',
    decadeSuffix: '-х',
    languageAria: 'Мова інтерфейсу',
  },
  en: {
    badge: 'film diary',
    title: 'alex top films',
    titleReload: 'Reload site',
    subtitle: 'A personal scrapbook of films and series I still remember.',
    searchPlaceholder: 'Title or director',
    searchAria: 'Search movies',
    clearSearch: 'Clear search',
    allGenres: 'All genres',
    allDecades: 'All years',
    mediaAria: 'Filter by media type',
    media_all: 'All',
    media_movie: 'Movies',
    media_series: 'Series',
    genreAria: 'Filter by genre',
    decadeAria: 'Filter by decade',
    sortAria: 'Sort',
    topAria: 'Top by rating',
    top_all: 'All',
    top_10: 'Top 10',
    top_20: 'Top 20',
    top_50: 'Top 50',
    top_100: 'Top 100',
    top_250: 'Top 250',
    sort_rating: 'My rating',
    sort_imdb: 'IMDb rating',
    sort_year_desc: 'Newer',
    sort_year_asc: 'Older',
    sort_title: 'A–Z',
    sortDisabledHint: 'Sorting disabled while Top N is active',
    empty: 'No results. Try different search or filters.',
    myRating: 'My rating',
    imdb: 'IMDb',
    reset: 'Reset',
    random: 'Random film',
    randomFilm: 'Random film',
    randomAria: 'Show a random film',
    clearRandomFilm: 'Clear random film',
    filtersToggle: 'Filters',
    filtersShow: 'Show filters',
    filtersHide: 'Hide filters',
    loadingMore: 'Loading more...',
    loadingData: 'Loading list...',
    paginationAria: 'Pagination',
    paginationPrev: 'Previous',
    paginationNext: 'Next',
    paginationInfo: 'Page {current} of {total}',
    results: 'Results',
    films_one: 'film',
    films_few: 'films',
    films_many: 'films',
    decadeSuffix: 's',
    languageAria: 'Interface language',
  },
}

export function t(lang, key) {
  return STRINGS[lang]?.[key] ?? STRINGS.uk[key] ?? key
}

export function formatDecade(lang, decadeStart) {
  const suffix = t(lang, 'decadeSuffix')
  return `${decadeStart}${suffix}`
}

export function formatFilmCount(lang, count) {
  if (lang === 'en') {
    return count === 1 ? t(lang, 'films_one') : t(lang, 'films_few')
  }
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return t(lang, 'films_one')
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return t(lang, 'films_few')
  }
  return t(lang, 'films_many')
}

export function formatPagination(lang, current, total) {
  return t(lang, 'paginationInfo')
    .replace('{current}', String(current))
    .replace('{total}', String(total))
}
