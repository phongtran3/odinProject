const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const overlay = document.getElementById("overlay");
const sideBarContainer = document.getElementById("side-bar-container");

mobileMenuBtn.addEventListener("click", () => {
    overlay.style.display = overlay.style.display === "none" ? "block" : "none";
    sideBarContainer.classList.toggle("showOverlay");
})

overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    sideBarContainer.classList.remove("showOverlay");
});


