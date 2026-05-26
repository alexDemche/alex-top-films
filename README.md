# Топ фільми

Особистий каталог улюблених фільмів на React + Vite, з деплоєм на GitHub Pages.

## Локальний запуск

```bash
npm install
npm run dev
```

Відкрий [http://localhost:5173](http://localhost:5173).

## Додати свій фільм

Відредагуй `src/data/movies.js` — додай об'єкт з полями:

| Поле | Опис |
|------|------|
| `title` | Назва українською |
| `originalTitle` | Оригінальна назва |
| `year` | Рік |
| `director` | Режисер |
| `genre` | Масив жанрів, напр. `['Drama', 'Sci-Fi']` |
| `rating` | Твій рейтинг 1–10 |
| `note` | Коротка нотатка, чому сподобався |
| `poster` | URL постера |
| `accent` | Колір акценту картки (hex) |

Постери можна взяти з [TMDB](https://www.themoviedb.org/).

## GitHub Pages

1. Створи репозиторій `alex-top-films` на GitHub.
2. Запуш код у гілку `main`.
3. У репозиторії: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Після push workflow збере і опублікує сайт.

Сайт буде доступний за адресою:  
`https://<твій-username>.github.io/alex-top-films/`

### Якщо репозиторій називається інакше

Зміни `base` у `vite.config.js` на `/<назва-репо>/`.

## Стек

- React 19
- Vite 6
- GitHub Actions + Pages
