document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add-btn");
  const confirmBtn = document.getElementById("confirm-btn");
  const closeBtn = document.getElementById("close-btn");
  const form = document.getElementById("form");
  const dialog = document.querySelector("dialog");
  const myLibrary = [];

  document.getElementById("no-books").classList.add("show");

  addBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    form.reset();
    dialog.close();
  });

  confirmBtn.addEventListener("click", addBookToLibrary);

  function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
  }

  function addBookToLibrary(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const numPages = document.getElementById("numPages").value;
    const isRead = document.querySelector('input[name="choice"]:checked').value === "yes";

    const newBook = new Book(title, author, numPages, isRead);
    myLibrary.push(newBook);

    addToTable(newBook);
    form.reset();
    dialog.close();
  }

  function addToTable(newBook) {
    if (myLibrary.length > 0) {
      document.getElementById("no-books").classList.remove("show");
    }
    const dataID = myLibrary.indexOf(newBook);
    const tableBody = document.getElementById("book-table-body");

    const row = document.createElement("tr");
    row.setAttribute("data-id", dataID);

    //Create cell for title, author and number of pages
    const cellTitle = document.createElement("td");
    cellTitle.textContent = newBook.title;

    const cellAuthor = document.createElement("td");
    cellAuthor.textContent = newBook.author;

    const cellNumPages = document.createElement("td");
    cellNumPages.textContent = newBook.numPages;

    //Create read/not read button cell
    const readButtonCell = document.createElement("td");
    const readButton = document.createElement("button");
    readButton.setAttribute("data-id", dataID);
    readButton.textContent = newBook.isRead ? "Read" : "Not Read";
    readButton.addEventListener("click", (e) => {
      toggleRead(e, newBook);
    });
    readButtonCell.append(readButton);

    //Create Remove button cell
    const removeButtonCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.setAttribute("data-id", dataID);
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", (e) => {
      removeBook(e, newBook);
    });
    removeButtonCell.append(removeButton);

    row.append(cellTitle);
    row.append(cellAuthor);
    row.append(cellNumPages);
    row.append(readButtonCell);
    row.append(removeButtonCell);
    tableBody.append(row);
  }

  function toggleRead(e, newBook) {
    if (newBook.isRead) {
      e.target.textContent = "Not Read";
    } else {
      e.target.textContent = "Read";
    }
    newBook.isRead = !newBook.isRead;
  }

  function removeBook(e) {
    const dataID = e.target.getAttribute("data-id");
    const row = document.querySelector(`tr[data-id="${dataID}"]`);

    row.remove();
    myLibrary.splice(dataID, 1);
    if (myLibrary.length < 1) document.getElementById("no-books").classList.add("show");
  }
});
