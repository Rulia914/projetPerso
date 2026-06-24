import {
  loadBooks,
  addBook,
  deleteBook,
  toggleReadStatus,
  setRating,
  getCurrentUser,
  setCurrentUser
} from "./services/bookStorage.js";

import "./styles/tailwind.css";

import { pickRandomBook } from "./core/randomEngine.js";
import { renderBook, renderBookList } from "./ui/bookRenderer.js";

document.addEventListener("DOMContentLoaded", () => {

  // ELEMENTS
  const addButton = document.getElementById("addBook");

  const modeFormBtn = document.getElementById("modeForm");
  const modeImportBtn = document.getElementById("modeImport");

  const formBlock = document.getElementById("formBlock");
  const importBlock = document.getElementById("importBlock");

  const timeToggle = document.getElementById("timeToggle");
  const timeSelect = document.getElementById("timeSelect");

  const pickButton = document.getElementById("pickBook");
  const rerollButton = document.getElementById("rerollBook");

  // ✅ USER
  let currentUser = getCurrentUser();

  if (!currentUser) {
    currentUser = prompt("Entrez votre nom d'utilisateur");
    setCurrentUser(currentUser);
    updateUserUI();
  }
  const userLabel = document.getElementById("currentUserLabel");

function updateUserUI() {
  const user = getCurrentUser();
  userLabel.textContent = `👤 ${user}`;
}
const changeUserBtn = document.getElementById("changeUserBtn");

changeUserBtn.addEventListener("click", () => {
  const newUser = prompt("Entrez un nouveau nom d'utilisateur");

  if (!newUser) return;

  setCurrentUser(newUser);

  // ✅ reload pour recharger les données
  location.reload();
});

  console.log("USER:", currentUser);

  let lastPickedId = null;

  // =======================
  // ✅ CRUD
  // =======================

  function refreshUI() {
    const books = loadBooks();
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

  // ✅ IMPORTANT : ici et uniquement ici
  refreshUI();

  // =======================
  // ✅ ADD BOOK
  // =======================

  if (addButton) {
    addButton.addEventListener("click", () => {

      const title = document.getElementById("title").value.trim();
      const author = document.getElementById("author").value.trim();
      const pages = document.getElementById("pages").value;

      console.log("CLICK ADD", title, author);

      if (!title || !author) {
        alert("Titre et auteur obligatoires ❗");
        return;
      }

      const newBook = {
        id: Date.now(),
        title,
        author,
        pages: Number(pages) || 0,
        read: false,
        rating: 0
      };

      addBook(newBook);

      document.getElementById("title").value = "";
      document.getElementById("author").value = "";
      document.getElementById("pages").value = "";

      refreshUI();
    });
  }

  // =======================
  // ✅ SWITCH
  // =======================

  formBlock.classList.remove("hidden");
  importBlock.classList.add("hidden");

  modeFormBtn.addEventListener("click", () => {
    formBlock.classList.remove("hidden");
    importBlock.classList.add("hidden");
  });

  modeImportBtn.addEventListener("click", () => {
    formBlock.classList.add("hidden");
    importBlock.classList.remove("hidden");
  });

  // =======================
  // ✅ FILTER
  // =======================

  timeToggle.addEventListener("change", () => {
    timeSelect.classList.toggle("hidden", !timeToggle.checked);
  });

  // =======================
  // ✅ RANDOM
  // =======================

  function pickBookHandler() {
    const books = loadBooks();

    const useFilter = timeToggle.checked;
    const selectedTime = timeSelect.value;

    let availableBooks = books.filter(b => !b.read);

if (lastPickedId && availableBooks.length > 1) {
  availableBooks = availableBooks.filter(b => b.id !== lastPickedId);
}


    pickButton.disabled = true;
    rerollButton.disabled = true;

    let counter = 0;

    const interval = setInterval(() => {
      const temp = availableBooks[Math.floor(Math.random() * availableBooks.length)];
      renderBook(temp);

      if (++counter > 10) {
        clearInterval(interval);

        const finalBook = pickRandomBook(
          books,
          useFilter,
          selectedTime,
          lastPickedId
        );

        if (finalBook) lastPickedId = finalBook.id;

        renderBook(finalBook);

        pickButton.disabled = false;
        rerollButton.disabled = false;

        rerollButton.classList.remove("hidden");
      }
    }, 100);
  }

  pickButton.addEventListener("click", pickBookHandler);
  rerollButton.addEventListener("click", pickBookHandler);

});
