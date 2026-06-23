export function pickRandomBook(books) {
    const unreadBooks = books.filter(book => book.read === false);
  
    if (unreadBooks.length === 0) return null;
  
    const randomIndex = Math.floor(Math.random() * unreadBooks.length);
    return unreadBooks[randomIndex];
  }
  ``