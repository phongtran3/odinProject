document.addEventListener("DOMContentLoaded", () => {
  const headerDashboard = document.getElementById("header-dashboard");
  const navOverlay = document.getElementById("nav-overlay");
  const navbarContainer = document.getElementById("nav-container");

  //Clicking the dashboard logo on the header will open the navbar overlay.
  headerDashboard.addEventListener("click", () => {
    navOverlay.style.display = navOverlay.style.display === "none" ? "block" : "none";
    navbarContainer.classList.add("showOverlay");
  });

  //When navbar overlay is open, click out of the overlay will close it.
  navOverlay.addEventListener("click", () => {
    navOverlay.style.display = "none";
    navbarContainer.classList.remove("showOverlay");
  });
});
