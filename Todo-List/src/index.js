const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const overlay = document.getElementById("overlay");
const sideBarContainer = document.getElementById("side-bar-container");

const navTaskFilters = document.querySelector(".nav-task-filter");
const filterOptions = navTaskFilters.querySelectorAll(".filter-item");

const deleteBtns = document.querySelectorAll(".delete-btn");

const deleteDialog = document.getElementById("delete-dialog-container");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");

mobileMenuBtn.addEventListener("click", () => {
  overlay.style.display = overlay.style.display === "none" ? "block" : "none";
  sideBarContainer.classList.toggle("showOverlay");
});

overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  sideBarContainer.classList.remove("showOverlay");
});

//Selecting new filter
filterOptions.forEach((li) => {
  li.addEventListener("click", () => {
    filterOptions.forEach((option) => option.classList.remove("task-active"));
    li.classList.toggle("task-active");

    sideBarContainer.classList.toggle("showOverlay");
    overlay.style.display = "none";

    const mainHeader = li.querySelector("h3").textContent;
    document.getElementById("main-header").innerHTML = mainHeader;

    console.log("test");
  });
});

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.getAttribute("data-type");

    if (type === "project") {
      const project = btn.closest(".nav-item");

      deleteDialog.querySelector("h4").textContent = `Are you sure you want to delete this ${type}?`;
    } else {
      const task = btn.closest(".task-card");
      deleteDialog.querySelector("h4").textContent = `Are you sure you want to delete this ${type}?`;
    }

    deleteDialog.showModal();
    overlay.style.display = overlay.style.display === "none" ? "block" : "none";
  });
});

noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  form.reset();
  deleteDialog.close();
  overlay.style.display = "none";
});
