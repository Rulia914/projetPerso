export function renderBook(book) {
    const container = document.getElementById("result");
  
    if (!book) {
      container.innerHTML = "<p>Aucun livre disponible</p>";
      return;
    }
  
    container.innerHTML = `
      <div class="bg-[#FBFBFA] p-4 rounded shadow">
        <h2 class="font-serif text-xl mb-2">${book.title}</h2>
        <p>${book.author}</p>
        <p>${book.pages} pages</p>
      </div>
    `;
  }
  
  export function renderBookList(books, onDelete, onToggleRead) {
    const container = document.getElementById("bookList");
  
    if (books.length === 0) {
      container.innerHTML = "<p>Aucun livre</p>";
      return;
    }
  
    container.innerHTML = books.map(book => `
      <div class="bg-white p-3 mb-2 rounded shadow flex justify-between items-center">
        <div>
          <p class="font-semibold ${book.read ? "line-through" : ""}">
            ${book.title}
          </p>
          <p class="text-sm">${book.author}</p>
        </div>
  
        <div class="flex gap-2">
          <button 
            data-id="${book.id}" 
            class="toggle-read bg-green-500 text-white px-2 py-1 text-xs">
            ${book.read ? "Lu ✅" : "Non lu"}
          </button>
  
          <button 
            data-id="${book.id}" 
            class="delete-book bg-red-500 text-white px-2 py-1 text-xs">
            Supprimer
          </button>
        </div>
      </div>
    `).join("");
  
    // EVENTS
    document.querySelectorAll(".delete-book").forEach(btn => {
      btn.addEventListener("click", () => onDelete(Number(btn.dataset.id)));
    });
  
    document.querySelectorAll(".toggle-read").forEach(btn => {
      btn.addEventListener("click", () => onToggleRead(Number(btn.dataset.id)));
    });
  }
  ``