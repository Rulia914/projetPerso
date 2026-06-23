import {
  addBook, 
  getAllBooks, 
  deleteBook, 
  toggleReadStatus,
  setRating
} from "./services/bookStorage.js";

import "./styles/tailwind.css";
import { pickRandomBook } from "./core/randomEngine.js";
import { renderBook, renderBookList } from "./ui/bookRenderer.js";

const timeToggle = document.getElementById("timeToggle");
const timeSelect = document.getElementById("timeSelect");

timeToggle.addEventListener("change", () => {
  if (timeToggle.checked) {
    timeSelect.classList.remove("hidden");
  } else {
    timeSelect.classList.add("hidden");
  }
});


const addButton = document.getElementById("addBook");
const pickButton = document.getElementById("pickBook");

function refreshUI() {
  const books = getAllBooks();
  renderBookList(books, handleDelete, handleToggleRead, handleRate);
}

function handleDelete(id) {
  deleteBook(id);
  refreshUI();
}

function handleToggleRead(id) {
  toggleReadStatus(id);
  refreshUI();
}

function handleRate(id, rating) {
  setRating(id, rating);
  refreshUI();
}

// ADD
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
    rating: 0
  });

  refreshUI();
});

// PICK
pickButton.addEventListener("click", () => {
  const books = getAllBooks();

  const useFilter = timeToggle.checked;
  const selectedTime = timeSelect.value;

  const selectedBook = pickRandomBook(books, useFilter, selectedTime);

  renderBook(selectedBook);
});