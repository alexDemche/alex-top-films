const STRINGS = {
  uk: {
    badge: 'мій топ',
    title: 'alex top films',
    subtitle: 'Мій особистий топ фільмів, які я колись дивився і мені сподобались.',
    searchPlaceholder: 'Пошук за назвою або режисером…',
    searchAria: 'Пошук фільмів',
    allGenres: 'Усі жанри',
    allDecades: 'Усі роки',
    decadeLabel: 'Декада',
    genreAria: 'Фільтр за жанром',
    decadeAria: 'Фільтр за роками (декада)',
    sortAria: 'Сортування',
    sort_rating: 'За моїм рейтингом',
    sort_year_desc: 'Новіші',
    sort_year_asc: 'Старіші',
    sort_title: 'А–Я',
    empty: 'Нічого не знайдено. Спробуй інший пошук або фільтри.',
    myRating: 'Мій рейтинг',
    imdb: 'IMDb',
    reset: 'Скинути',
    results: 'Знайдено',
    decadeSuffix: '-х',
  },
  en: {
    badge: 'my picks',
    title: 'alex top films',
    subtitle: 'My personal top films I watched and loved.',
    searchPlaceholder: 'Search by title or director…',
    searchAria: 'Search movies',
    allGenres: 'All genres',
    allDecades: 'All years',
    decadeLabel: 'Decade',
    genreAria: 'Filter by genre',
    decadeAria: 'Filter by decade',
    sortAria: 'Sort',
    sort_rating: 'My rating',
    sort_year_desc: 'Newer',
    sort_year_asc: 'Older',
    sort_title: 'A–Z',
    empty: 'No results. Try different search or filters.',
    myRating: 'My rating',
    imdb: 'IMDb',
    reset: 'Reset',
    results: 'Results',
    decadeSuffix: 's',
  },
}

export function t(lang, key) {
  return STRINGS[lang]?.[key] ?? STRINGS.uk[key] ?? key
}

export function formatDecade(lang, decadeStart) {
  // decadeStart: 1980 -> '1980-х' (uk) / '1980s' (en)
  const suffix = t(lang, 'decadeSuffix')
  return `${decadeStart}${suffix}`
}

