document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add-btn");
  const closeBtn = document.getElementById("close-btn");
  const dialog = document.querySelector("dialog");
  const myLibrary = [];

  addBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  closeBtn.addEventListener("click", () => {
    dialog.close();
  });

  function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
  }

  function addBookToLibrary() {}
});
