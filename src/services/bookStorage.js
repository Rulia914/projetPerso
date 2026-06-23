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

export function deleteBook(id) {
  const books = getAllBooks().filter(book => book.id !== id);
  saveAllBooks(books);
}

export function toggleReadStatus(id) {
  const books = getAllBooks().map(book => {
    if (book.id === id) {
      return { ...book, read: !book.read };
    }
    return book;
  });

  saveAllBooks(books);
}
export function setRating(id, rating) {
    const books = getAllBooks().map(book => {
      if (book.id === id) {
        return { ...book, rating };
      }
      return book;
    });
  
    saveAllBooks(books);
  }
  ``