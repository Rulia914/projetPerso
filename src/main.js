import {
  addBook, 
  getAllBooks, 
  deleteBook, 
  toggleReadStatus 
} from "./services/bookStorage.js";

import { pickRandomBook } from "./core/randomEngine.js";
import { renderBook, renderBookList } from "./ui/bookRenderer.js";

const addButton = document.getElementById("addBook");
const pickButton = document.getElementById("pickBook");

function refreshUI() {
  const books = getAllBooks();
  renderBookList(books, handleDelete, handleToggleRead);
}

function handleDelete(id) {
  deleteBook(id);
  refreshUI();
}

function handleToggleRead(id) {
  toggleReadStatus(id);
  refreshUI();
}

// ADD BOOK
addButton.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;

  if (!title || !author) {
    alert("Titre et auteur obligatoires");
    return;
  }

  addBook({
    id: Date.now(),
    title,
    author,
    pages: Number(pages),
    read: false,
    rating: null
  });

  refreshUI();
});

// PICK
pickButton.addEventListener("click", () => {
  const books = getAllBooks();
  const selectedBook = pickRandomBook(books);
  renderBook(selectedBook);
});

// INIT
refreshUI();