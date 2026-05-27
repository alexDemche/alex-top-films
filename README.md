# alex top films

Особистий каталог улюблених фільмів — **ALEX TOP FILMS**.  
React-додаток з фільтрами, сортуванням, двома мовами (UA/EN) і деплоєм на GitHub Pages.

**Live:** [https://alexDemche.github.io/alex-top-films/](https://alexDemche.github.io/alex-top-films/)

---

## Про проєкт

Це простий, але сучасний сайт-каталог фільмів, які я колись дивився і які мені сподобались.  
За замовчуванням дані читаються з `src/data/movies.js`, але проєкт також підтримує Google Sheets як джерело даних.

### Можливості

- Картки фільмів з постером, жанрами, режисером і нотаткою
- **Два рейтинги:** мій (1–10) і **IMDb**
- **Пошук** за назвою або режисером
- **Фільтри:** жанр, декада (1970–2020), Top N (10 / 20 / 50 / 100 / 250)
- **Сортування:** за моїм рейтингом, IMDb, роком, назвою (A–Я)
- **Рандомний фільм** — показує один випадковий фільм з поточного списку
- **Дві мови інтерфейсу:** українська / англійська
- Налаштування зберігаються в `localStorage` (Zustand persist)
- Адаптивний дизайн для телефонів

---

## Технології

| Категорія | Стек |
|-----------|------|
| UI | React 19 |
| Збірка | Vite 6 |
| Стан | Zustand (+ persist) |
| Стилі | CSS (custom, без UI-фреймворків) |
| Деплой | GitHub Actions → GitHub Pages |
| Шрифти | Google Fonts (Outfit, Playfair Display) |

---

## Структура проєкту

```
alex-top-films/
├── .github/workflows/deploy.yml   # CI/CD для GitHub Pages
├── public/                        # favicon та статичні файли
├── src/
│   ├── components/                # Header, SearchBar, FilterBar, MovieCard…
│   ├── data/movies.js             # локальний fallback
│   ├── lib/                       # i18n, фільтрація, константи
│   │   └── sheets.js              # завантаження даних з Google Sheets CSV
│   ├── store/useAppStore.js       # глобальний стан (Zustand)
│   ├── App.jsx                    # головний компонент
│   └── main.jsx
├── index.html
├── vite.config.js                 # base для GitHub Pages
└── package.json
```

---

## Локальний запуск

**Потрібно:** Node.js 18+ (рекомендовано 20+)

```bash
# клонувати репозиторій
git clone git@github.com:alexDemche/alex-top-films.git
cd alex-top-films

# встановити залежності
npm install

# dev-сервер
npm run dev
```

Відкрий [http://localhost:5173](http://localhost:5173).

### Інші команди

```bash
npm run build    # production-збірка в dist/
npm run preview  # перегляд зібраного dist локально
```

---

## Джерело даних

### Варіант A (поточний) — локальний `movies.js`

Редагуй `src/data/movies.js` і пуш у GitHub.

### Варіант B (рекомендовано для 200+ записів) — Google Sheets

1. Створи Google Sheet з колонками (рядок заголовків):
   - `id`, `mediaType`, `title`, `originalTitle`, `year`, `director`, `genre`, `rating`, `imdbRating`, `note`, `poster`, `accent`, `active`
2. Заповнюй дані рядками (`mediaType`: `movie` або `series`, `genre`: через кому, напр. `Sci-Fi,Drama`).
3. Опублікуй таблицю:
   - **File → Share → Publish to web**
   - Обери потрібний лист
   - Формат: **CSV**
4. Скопіюй CSV URL і додай у `.env.local`:

```bash
VITE_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/e/.../pub?gid=0&single=true&output=csv
```

5. Перезапусти dev сервер `npm run dev`.

Якщо таблиця недоступна або порожня — додаток автоматично використовує локальний `src/data/movies.js`.

---

## Як додати новий фільм

Відкрий **`src/data/movies.js`** і додай об'єкт у масив `movies`.

### Приклад

```js
{
  id: 15,
  title: 'Гладіатор',
  originalTitle: 'Gladiator',
  year: 2000,
  director: 'Рідлі Скотт',
  genre: ['Action', 'Drama'],
  rating: 9,
  imdbRating: 8.5,
  note: 'Епічна історія про помсту.',
  poster: 'https://image.tmdb.org/t/p/w500/ty8OpRMfUxGy0yq4gVp6s7sPn.jpg',
  accent: '#b8860b',
},
```

### Опис полів

| Поле | Тип | Опис |
|------|-----|------|
| `id` | number | Унікальний ID (кожен новий фільм — +1) |
| `title` | string | Назва українською |
| `originalTitle` | string | Оригінальна назва |
| `year` | number | Рік виходу |
| `director` | string | Режисер |
| `mediaType` | string | `movie` або `series` |
| `genre` | string[] | Жанри, напр. `['Horror', 'Drama']` |
| `rating` | number | Твій рейтинг **1–10** |
| `imdbRating` | number | Рейтинг IMDb, напр. `8.5` |
| `note` | string | Коротка нотатка — чому сподобався |
| `poster` | string | URL постера (див. нижче) |
| `accent` | string | Колір акценту картки в hex, напр. `#e8b84a` |

### Поради

- **`id`** — має бути унікальним; перевір останній id у файлі і додай +1
- **`genre`** — використовуй однакові назви жанрів (з'являться у фільтрі автоматично)
- **`accent`** — підбери колір під атмосферу фільму (золотий, синій, червоний…)
- Після додавання перевір локально: `npm run dev`

---

## Де брати постери та рейтинг IMDb

### Постери — TMDB (рекомендовано)

1. Зайди на [themoviedb.org](https://www.themoviedb.org/)
2. Знайди фільм → **Images → Posters**
3. ПКМ по постеру → **Copy image address**

URL виглядає так:

```
https://image.tmdb.org/t/p/w500/XXXXXXXX.jpg
```

`w500` — ширина 500px, достатньо для карток.  
Можна також `w342` (менше) або `w780` (більше).

### Рейтинг IMDb

1. Відкрий фільм на [imdb.com](https://www.imdb.com/)
2. Скопіюй рейтинг (напр. **8.7**) у поле `imdbRating`

### Альтернатива: локальні постери

Поклади файл у `public/posters/`, наприклад `public/posters/gladiator.jpg`, і вкажи:

```js
poster: '/alex-top-films/posters/gladiator.jpg',
```

> Шлях має враховувати `base: '/alex-top-films/'` з `vite.config.js`.

---

### Додав нові фільми — оновити сайт (локальний режим)

```bash
git add src/data/movies.js
git commit -m "Add new films to catalog"
git push
```

Після push GitHub Actions автоматично збере і опублікує сайт (зазвичай 1–2 хв).

### Перевірити деплой

У репозиторії: **Actions** → workflow **Deploy to GitHub Pages** → статус має бути зеленим.

---

## GitHub Pages — налаштування

1. Репозиторій на GitHub: `alexDemche/alex-top-films`
2. **Settings → Pages → Build and deployment**
3. **Source:** GitHub Actions
4. Після push у `main` workflow `.github/workflows/deploy.yml` деплоїть `dist/`

**URL сайту:**  
`https://alexDemche.github.io/alex-top-films/`

### Якщо репозиторій називається інакше

Зміни `base` у `vite.config.js`:

```js
export default defineConfig({
  base: '/<назва-репо>/',
})
```

---

## Фільтри та сортування — як це працює

| Функція | Поведінка |
|---------|-----------|
| **Пошук** | Тільки `title` і `director` |
| **Top N** | Завжди по **моєму рейтингу** (`rating`), сортування вимкнене |
| **Рандомний фільм** | Один випадковий з поточного списку; **Скинути** — вихід + скидання всіх фільтрів |
| **Декади** | 1970–2020; порожні — disabled у select |
| **Мова** | UA / EN — зберігається в localStorage |

---

## Ліцензія

Особистий проєкт. Використовуй як шаблон для свого каталогу.

**Автор:** [alexDemche](https://github.com/alexDemche)
