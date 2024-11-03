const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const overlay = document.getElementById("overlay");
const sideBarContainer = document.getElementById("side-bar-container");

const navTaskFilters = document.querySelector(".nav-task-filter");
const filterOptions = navTaskFilters.querySelectorAll(".filter-item");

const addEventListeners = () => {
  handleMobileMenuBtn();
  handleOverlay();
  handleFilterSelect();
  //handleNewProject();
};

const handleMobileMenuBtn = () => {
  mobileMenuBtn.addEventListener("click", () => {
    overlay.style.display = overlay.style.display === "none" ? "block" : "none";
    sideBarContainer.classList.toggle("showOverlay");
  });
};

const handleOverlay = () => {
  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    sideBarContainer.classList.remove("showOverlay");
  });
};

//Selecting new filter
const handleFilterSelect = () => {
  filterOptions.forEach((li) => {
    li.addEventListener("click", () => {
      filterOptions.forEach((option) => option.classList.remove("task-active"));
      li.classList.toggle("task-active");

      sideBarContainer.classList.toggle("showOverlay");
      overlay.style.display = "none";

      const mainHeader = li.querySelector("h3").textContent;
      document.getElementById("main-header").innerHTML = mainHeader;

      console.log(`Selecting filter... ${mainHeader}`);
    });
  });
};

export default addEventListeners;
