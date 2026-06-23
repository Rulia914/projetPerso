export function renderBook(book) {
    const container = document.getElementById("result");
  
    if (!book) {
      container.innerHTML = "<p>Aucun livre disponible</p>";
      return;
    }
  
    container.innerHTML = `
      <div class="bg-[#FBFBFA] p-4 rounded shadow">
        <h2 class="font-serif text-xl mb-2">${book.title}</h2>
        <p class="mb-1">${book.author}</p>
        <p class="text-sm">${book.pages} pages</p>
      </div>
    `;
  }