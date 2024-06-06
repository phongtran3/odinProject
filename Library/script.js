document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add-btn");
  const confirmBtn = document.getElementById("confirm-btn");
  const closeBtn = document.getElementById("close-btn");
  // const readBtn = document.getElementById("read-btn");
  // const removeBtn = document.getElementById("remove-btn");
  const dialog = document.querySelector("dialog");
  const myLibrary = [];

  document.getElementById("no-books").classList.add("show");

  addBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
  });

  // readBtn.addEventListener("click", (e) => {
  //   console.log(e.target);
  // });

  // removeBtn.addEventListener("click", (e) => {
  //   console.log(e.target);
  // });

  confirmBtn.addEventListener("click", addBookToLibrary);

  function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
  }

  function addBookToLibrary() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const numPages = document.getElementById("numPages").value;
    const isRead = document.querySelector('input[name="choice"]:checked').value === "yes";

    const newBook = new Book(title, author, numPages, isRead);
    myLibrary.push(newBook);

    addToTable(newBook);
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

    row.append(cellTitle);
    row.append(cellAuthor);
    row.append(cellNumPages);
    row.append(readButtonCell);
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
});
