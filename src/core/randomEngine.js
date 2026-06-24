export function pickRandomBook(books, useFilter = false, time = null, lastId = null) {

  let filteredBooks = books.filter(book => !book.read);

  if (useFilter && time) {
    if (time === "short") {
      filteredBooks = filteredBooks.filter(book => book.pages < 120);
    }
    if (time === "medium") {
      filteredBooks = filteredBooks.filter(book => book.pages >= 120 && book.pages <= 300);
    }
    if (time === "long") {
      filteredBooks = filteredBooks.filter(book => book.pages > 300);
    }
  }

  if (lastId && filteredBooks.length > 1) {
    filteredBooks = filteredBooks.filter(book => book.id !== lastId);
  }

  if (filteredBooks.length === 0) return null;

  const index = Math.floor(Math.random() * filteredBooks.length);
  return filteredBooks[index];
}