export function renderStars(book, onRate) {
    if (!book.read) return "";
  
    let stars = "";
  
    for (let i = 1; i <= 5; i++) {
      const filled = i <= book.rating;
  
      stars += `
        <button
          data-id="${book.id}"
          data-rating="${i}"
          class="star text-lg ${filled ? "text-yellow-400" : "text-gray-300"}">
          ★
        </button>
      `;
    }
  
    return `<div class="flex gap-1 mt-1">${stars}</div>`;
  }
  
  export function renderBook(book) {
    const container = document.getElementById("result");
  
    if (!book) {
      container.innerHTML = `
        <p class="text-gray-500 text-sm">
          Aucun livre disponible
        </p>
      `;
      return;
    }
  
    container.innerHTML = `
      <div class="text-center">
        <h2 class="text-lg font-serif mb-1">
          ${book.title}
        </h2>
        <p class="text-sm text-gray-500">
          ${book.author}
        </p>
        <p class="text-xs text-gray-400">
          ${book.pages} pages
        </p>
      </div>
    `;
  }
  
  export function renderBookList(books, onDelete, onToggleRead, onRate) {
    const container = document.getElementById("bookList");
  
    if (books.length === 0) {
      container.innerHTML = `
        <p class="text-gray-500 text-sm">
          Aucun livre dans ta PAL
        </p>
      `;
      return;
    }
  
    let html = "";
  
    books.forEach(book => {
      html += `
        <div class="bg-white p-3 rounded-md border border-gray-200 flex justify-between items-start">
  
          <div class="flex-1">
            <h3 class="text-sm font-semibold ${book.read ? "text-gray-400" : "text-gray-900"}">
              ${book.title}
            </h3>
  
            <p class="text-xs text-gray-500">
              ${book.author}
            </p>
  
            ${renderStars(book)}
  
          </div>
  
          <div class="flex flex-col gap-1">
  
            <button
              data-id="${book.id}"
              class="toggle-read text-xs px-2 py-1 rounded bg-gray-200">
              ${book.read ? "Lu" : "Non lu"}
            </button>
  
            <button
              data-id="${book.id}"
              class="delete-book text-xs px-2 py-1 rounded bg-red-500 text-white">
              ✕
            </button>
  
          </div>
  
        </div>
      `;
    });
  
    container.innerHTML = html;
  
    // EVENTS
    document.querySelectorAll(".delete-book").forEach(btn => {
      btn.addEventListener("click", () => {
        onDelete(Number(btn.dataset.id));
      });
    });
  
    document.querySelectorAll(".toggle-read").forEach(btn => {
      btn.addEventListener("click", () => {
        onToggleRead(Number(btn.dataset.id));
      });
    });
  
    document.querySelectorAll(".star").forEach(star => {
      star.addEventListener("click", () => {
        onRate(Number(star.dataset.id), Number(star.dataset.rating));
      });
    });
  }
  ``