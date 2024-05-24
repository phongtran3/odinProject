document.addEventListener("DOMContentLoaded", () => {
  const headerDashboard = document.getElementById("header-dashboard");
  const navOverlay = document.getElementById("nav-overlay");
  const navbarContainer = document.getElementById("nav-container");
  const footerNavItems = document.querySelectorAll(".footer-nav-mobile .nav-mobile-menu li");

  const containerMap = {
    announcement: document.getElementById("announcements-container"),
    home: document.getElementById("projects-container"),
    trending: document.getElementById("trending-container"),
  };

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

  //Footer active state. Display corresponding section when active.
  footerNavItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      footerNavItems.forEach((item) => item.classList.remove("active"));
      e.currentTarget.classList.add("active");

      const name = e.currentTarget.getAttribute("title");
      Object.values(containerMap).forEach((container) => {
        container.style.display = "none";
      });
      // Show the clicked container
      containerMap[name].style.display = "block";
    });
  });
});
