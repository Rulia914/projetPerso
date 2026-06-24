// =======================
// ✅ USER MANAGEMENT
// =======================

export function setCurrentUser(username) {
  localStorage.setItem("user_current", username);
}

export function getCurrentUser() {
  return localStorage.getItem("user_current");
}

// ✅ clé dynamique par utilisateur
function getStorageKey() {
  const user = getCurrentUser();
  return user ? `books_${user}` : "books_default";
}

// =======================
// ✅ STORAGE
// =======================

export function loadBooks() {
  const key = getStorageKey();
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

export function saveBooks(books) {
  const key = getStorageKey();
  localStorage.setItem(key, JSON.stringify(books));
}

// =======================
// ✅ CRUD
// =======================

export function addBook(book) {
  const books = loadBooks();
  books.push(book);
  saveBooks(books);
}

export function deleteBook(id) {
  const books = loadBooks().filter(book => book.id !== id);
  saveBooks(books);
}

export function toggleReadStatus(id) {
  const books = loadBooks().map(book =>
    book.id === id ? { ...book, read: !book.read } : book
  );
  saveBooks(books);
}

export function setRating(id, rating) {
  const books = loadBooks().map(book =>
    book.id === id ? { ...book, rating } : book
  );
  saveBooks(books);
}
