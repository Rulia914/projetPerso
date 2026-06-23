const STORAGE_KEY = "alchimie-books";

export function getAllBooks() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveAllBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

export function addBook(book) {
  const books = getAllBooks();
  books.push(book);
  saveAllBooks(books);
}
