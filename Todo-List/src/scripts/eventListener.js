const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const overlay = document.getElementById("overlay");
const sideBarContainer = document.getElementById("side-bar-container");

const addEventListeners = () => {
  handleMobileMenuBtn();
  handleOverlay();
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


export default addEventListeners;
