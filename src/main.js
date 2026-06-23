import './style.css'

const STORAGE_KEY = 'alchimie-litteraire-state'

const books = [
  {
    id: 'ombres-du-nord',
    title: 'Les Ombres du Nord',
    author: 'Elise Marceau',
    genre: 'Polar',
    pages: 328,
    minutes: 35,
    mood: 'Tension feutree',
    description:
      'Une enquetrice revient dans son village natal, ou une disparition ancienne trouble encore les familles.',
  },
  {
    id: 'cartographe-des-reves',
    title: 'La Cartographe des reves',
    author: 'Nora Belin',
    genre: 'Imaginaire',
    pages: 412,
    minutes: 50,
    mood: 'Evasion',
    description:
      'Une apprentie cartographe decouvre des villes qui n existent que lorsque quelqu un les imagine.',
  },
  {
    id: 'notes-de-minuit',
    title: 'Notes de minuit',
    author: 'Samir Delsaux',
    genre: 'Contemporain',
    pages: 184,
    minutes: 20,
    mood: 'Intime',
    description:
      'Un roman court fait de lettres, de trajets nocturnes et de decisions prises trop tard.',
  },
  {
    id: 'jardin-des-horloges',
    title: 'Le Jardin des horloges',
    author: 'Maud Serin',
    genre: 'Historique',
    pages: 276,
    minutes: 30,
    mood: 'Elegant',
    description:
      'Dans un atelier d horlogerie du XIXe siecle, une heritiere tente de sauver le metier familial.',
  },
  {
    id: 'silence-des-cometes',
    title: 'Le Silence des cometes',
    author: 'Lina Verhaegen',
    genre: 'Science-fiction',
    pages: 510,
    minutes: 60,
    mood: 'Vertige',
    description:
      'Une mission spatiale capte un signal impossible, puis perd peu a peu la notion du temps terrestre.',
  },
  {
    id: 'petites-victoires',
    title: 'Petites victoires ordinaires',
    author: 'Claire Montval',
    genre: 'Contemporain',
    pages: 236,
    minutes: 25,
    mood: 'Reconfort',
    description:
      'Une libraire note les transformations minuscules des personnes qui passent chaque semaine entre ses rayons.',
  },
  {
    id: 'archive-des-tempetes',
    title: 'L Archive des tempetes',
    author: 'Iris Morel',
    genre: 'Aventure',
    pages: 368,
    minutes: 45,
    mood: 'Grand large',
    description:
      'Deux soeurs suivent le journal de bord de leur grand-mere pour retrouver une ile effacee des cartes.',
  },
  {
    id: 'theorie-du-the',
    title: 'La Theorie du the',
    author: 'Hugo Varenne',
    genre: 'Essai',
    pages: 152,
    minutes: 15,
    mood: 'Curieux',
    description:
      'Un essai accessible sur les rituels, le temps long et ce que nos pauses disent de nous.',
  },
]

const defaultState = {
  query: '',
  genre: 'Tous',
  time: 'Tous',
  hideRead: false,
  selectedId: books[0].id,
  readIds: ['notes-de-minuit', 'theorie-du-the'],
}

let state = loadState()

function loadState() {
  try {
    const storedState = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return { ...defaultState, ...storedState }
  } catch {
    return defaultState
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function getGenres() {
  return ['Tous', ...new Set(books.map((book) => book.genre))]
}

function getTimeLabel(book) {
  if (book.minutes <= 20) return 'Lecture courte'
  if (book.minutes <= 40) return 'Soiree calme'
  return 'Long moment'
}

function getFilteredBooks() {
  const normalizedQuery = state.query.trim().toLowerCase()

  return books.filter((book) => {
    const matchesQuery =
      !normalizedQuery ||
      [book.title, book.author, book.genre, book.mood]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    const matchesGenre = state.genre === 'Tous' || book.genre === state.genre
    const matchesTime = state.time === 'Tous' || getTimeLabel(book) === state.time
    const matchesReadStatus = !state.hideRead || !state.readIds.includes(book.id)

    return matchesQuery && matchesGenre && matchesTime && matchesReadStatus
  })
}

function getSelectedBook(filteredBooks = getFilteredBooks()) {
  return (
    books.find((book) => book.id === state.selectedId) ||
    filteredBooks[0] ||
    books[0]
  )
}

function pickRandomBook() {
  const filteredBooks = getFilteredBooks()
  if (filteredBooks.length === 0) return

  const nextBook = filteredBooks[Math.floor(Math.random() * filteredBooks.length)]
  state = { ...state, selectedId: nextBook.id }
  render()
}

function toggleRead(bookId) {
  const readIds = state.readIds.includes(bookId)
    ? state.readIds.filter((id) => id !== bookId)
    : [...state.readIds, bookId]

  state = { ...state, readIds }
  render()
}

function setState(partialState) {
  state = { ...state, ...partialState }
  render()
}

function render() {
  const filteredBooks = getFilteredBooks()
  const selectedBook = getSelectedBook(filteredBooks)
  const unreadCount = books.length - state.readIds.length
  const progress = Math.round((state.readIds.length / books.length) * 100)

  document.querySelector('#app').innerHTML = `
    <main class="min-h-screen bg-[#f6f2ea] text-slate-950">
      <section class="border-b border-slate-950/10 bg-white">
        <div class="mx-auto grid min-h-[92vh] max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:px-10">
          <div class="flex flex-col justify-between gap-8 py-4">
            <div class="space-y-7">
              <div class="flex items-center gap-3">
                <span class="grid size-10 place-items-center rounded bg-emerald-800 text-lg font-bold text-white">A</span>
                <div>
                  <p class="text-sm font-semibold text-emerald-900">L'Alchimie litteraire</p>
                  <p class="text-xs uppercase tracking-[0.18em] text-slate-500">Pile a lire intelligente</p>
                </div>
              </div>

              <div class="space-y-5">
                <h1 class="max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  Choisissez votre prochain livre sans hesiter.
                </h1>
                <p class="max-w-2xl text-base leading-7 text-slate-700">
                  Filtrez votre pile a lire selon votre temps, votre humeur et vos envies, puis laissez l'application proposer une lecture.
                </p>
              </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-3">
              ${statTile('Livres', books.length)}
              ${statTile('A lire', unreadCount)}
              ${statTile('Progression', `${progress}%`)}
            </div>
          </div>

          <div class="grid content-end gap-4">
            <article class="overflow-hidden rounded-lg border border-slate-950/10 bg-[#22352f] text-white shadow-xl">
              <div class="grid min-h-[440px] gap-0 md:grid-cols-[0.78fr_1fr]">
                <div class="flex flex-col justify-between bg-[#e1b955] p-6 text-slate-950">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.2em]">Suggestion</p>
                    <h2 class="mt-5 text-4xl font-black leading-none sm:text-5xl">${selectedBook.title}</h2>
                  </div>
                  <div class="space-y-2 text-sm">
                    <p class="font-bold">${selectedBook.author}</p>
                    <p>${selectedBook.genre} &middot; ${selectedBook.pages} pages &middot; ${selectedBook.minutes} min</p>
                  </div>
                </div>
                <div class="flex flex-col justify-between gap-8 p-6 sm:p-8">
                  <div class="space-y-5">
                    <span class="inline-flex w-fit rounded bg-white/10 px-3 py-1 text-sm text-emerald-50">${selectedBook.mood}</span>
                    <p class="max-w-xl text-xl leading-8 text-white/85">${selectedBook.description}</p>
                  </div>
                  <div class="flex flex-col gap-3 sm:flex-row">
                    <button class="js-random inline-flex items-center justify-center rounded bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-100">
                      Piocher un livre
                    </button>
                    <button class="js-toggle-read inline-flex items-center justify-center rounded border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10" data-id="${selectedBook.id}">
                      ${state.readIds.includes(selectedBook.id) ? 'Marquer a lire' : 'Marquer comme lu'}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[280px_1fr] lg:px-10">
        <aside class="h-fit rounded-lg border border-slate-950/10 bg-white p-4">
          <div class="space-y-5">
            <label class="block">
              <span class="text-sm font-semibold text-slate-800">Recherche</span>
              <input class="js-query mt-2 w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-emerald-800" value="${escapeHtml(state.query)}" placeholder="Titre, auteur, humeur">
            </label>

            <label class="block">
              <span class="text-sm font-semibold text-slate-800">Genre</span>
              <select class="js-genre mt-2 w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-emerald-800">
                ${getGenres().map((genre) => optionTemplate(genre, state.genre)).join('')}
              </select>
            </label>

            <label class="block">
              <span class="text-sm font-semibold text-slate-800">Temps disponible</span>
              <select class="js-time mt-2 w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-emerald-800">
                ${['Tous', 'Lecture courte', 'Soiree calme', 'Long moment']
                  .map((time) => optionTemplate(time, state.time))
                  .join('')}
              </select>
            </label>

            <label class="flex items-center gap-3 rounded border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-800">
              <input class="js-hide-read size-4 accent-emerald-800" type="checkbox" ${state.hideRead ? 'checked' : ''}>
              Masquer les livres lus
            </label>
          </div>
        </aside>

        <div class="space-y-4">
          <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p class="text-sm font-semibold text-emerald-900">${filteredBooks.length} resultat${filteredBooks.length > 1 ? 's' : ''}</p>
              <h2 class="text-2xl font-bold text-slate-950">Bibliotheque</h2>
            </div>
            <button class="js-clear-filters w-fit rounded border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-emerald-800">
              Reinitialiser
            </button>
          </div>

          <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            ${
              filteredBooks.length
                ? filteredBooks.map((book) => bookCard(book)).join('')
                : emptyState()
            }
          </div>
        </div>
      </section>
    </main>
  `

  bindEvents()
  saveState()
}

function statTile(label, value) {
  return `
    <div class="rounded-lg border border-slate-950/10 bg-[#f6f2ea] p-4">
      <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">${label}</p>
      <p class="mt-2 text-3xl font-black text-slate-950">${value}</p>
    </div>
  `
}

function optionTemplate(value, selectedValue) {
  return `<option value="${escapeHtml(value)}" ${value === selectedValue ? 'selected' : ''}>${escapeHtml(value)}</option>`
}

function bookCard(book) {
  const isRead = state.readIds.includes(book.id)
  const isSelected = state.selectedId === book.id

  return `
    <article class="rounded-lg border ${isSelected ? 'border-emerald-800' : 'border-slate-950/10'} bg-white p-4 shadow-sm">
      <div class="flex min-h-48 flex-col justify-between gap-5">
        <div class="space-y-3">
          <div class="flex items-start justify-between gap-3">
            <span class="rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">${book.genre}</span>
            <span class="text-xs font-semibold ${isRead ? 'text-emerald-800' : 'text-slate-500'}">${isRead ? 'Lu' : 'A lire'}</span>
          </div>
          <div>
            <h3 class="text-lg font-black leading-snug text-slate-950">${book.title}</h3>
            <p class="mt-1 text-sm text-slate-600">${book.author}</p>
          </div>
          <p class="text-sm leading-6 text-slate-600">${book.mood} &middot; ${getTimeLabel(book)}</p>
        </div>
        <div class="flex gap-2">
          <button class="js-select-book flex-1 rounded bg-slate-950 px-3 py-2 text-sm font-bold text-white transition hover:bg-emerald-900" data-id="${book.id}">
            Choisir
          </button>
          <button class="js-toggle-read rounded border border-slate-300 px-3 py-2 text-sm font-bold text-slate-800 transition hover:border-emerald-800" data-id="${book.id}">
            ${isRead ? 'Relire' : 'Lu'}
          </button>
        </div>
      </div>
    </article>
  `
}

function emptyState() {
  return `
    <div class="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center md:col-span-2 xl:col-span-3">
      <p class="text-lg font-bold text-slate-950">Aucun livre ne correspond aux filtres.</p>
      <p class="mt-2 text-sm text-slate-600">Elargissez le genre, le temps disponible ou affichez les livres deja lus.</p>
    </div>
  `
}

function bindEvents() {
  document.querySelector('.js-random')?.addEventListener('click', pickRandomBook)

  document.querySelector('.js-query')?.addEventListener('input', (event) => {
    setState({ query: event.target.value })
  })

  document.querySelector('.js-genre')?.addEventListener('change', (event) => {
    setState({ genre: event.target.value })
  })

  document.querySelector('.js-time')?.addEventListener('change', (event) => {
    setState({ time: event.target.value })
  })

  document.querySelector('.js-hide-read')?.addEventListener('change', (event) => {
    setState({ hideRead: event.target.checked })
  })

  document.querySelector('.js-clear-filters')?.addEventListener('click', () => {
    setState({ query: '', genre: 'Tous', time: 'Tous', hideRead: false })
  })

  document.querySelectorAll('.js-select-book').forEach((button) => {
    button.addEventListener('click', () => {
      setState({ selectedId: button.dataset.id })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  })

  document.querySelectorAll('.js-toggle-read').forEach((button) => {
    button.addEventListener('click', () => toggleRead(button.dataset.id))
  })
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

render()
