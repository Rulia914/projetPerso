import { addBook, getAllBooks } from "./services/bookStorage.js";
import { pickRandomBook } from "./core/randomEngine.js";
import { renderBook } from "./ui/bookRenderer.js";

const addButton = document.getElementById("addBook");
const pickButton = document.getElementById("pickBook");

addButton.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;

  if (!title || !author) {
    alert("Titre et auteur obligatoires");
    return;
  }

  const newBook = {
    id: Date.now(),
    title,
    author,
    pages: Number(pages),
    read: false,
    rating: null
  };

  addBook(newBook);
  alert("Livre ajouté ✅");
});

pickButton.addEventListener("click", () => {
  const books = getAllBooks();
  const selectedBook = pickRandomBook(books);
  renderBook(selectedBook);
});
