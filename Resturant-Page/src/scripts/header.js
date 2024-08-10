import logo from "../assets/7-leaves-cafe-logo-red-transparent.png";

export default function createHeader() {
  console.log("test");
  const header = document.getElementById("header");

  //LOGO
  const headerLogoContainer = document.createElement("div");
  const logoImg = document.createElement("img");
  const logoBtn = document.createElement("button");

  headerLogoContainer.id = "header-logo-container";
  logoBtn.classList.add("img-btn");
  logoImg.src = logo;
  logoImg.id = "header-logo";
  logoBtn.appendChild(logoImg);
  headerLogoContainer.appendChild(logoBtn);

  //NAVBAR
  const navBurger = document.createElement("button");
  const burgerIcon = document.createElement("i");
  navBurger.classList.add("navbar-hamburger");
  navBurger.id = "hamburger-menu";
  burgerIcon.classList.add("fas", "fa-bars");
  navBurger.appendChild(burgerIcon);

  const nav = document.createElement("nav");
  nav.id = "nav-container";
  nav.classList.add("navbar");

  // <a href="javascript:void(0)" id="close-btn" class="close-button mobile">x</a>
  const xBtn = document.createElement("a");
  xBtn.id = "close-btn";
  xBtn.classList.add("close-button", "mobile");
  xBtn.textContent = "x";

  const navbarItems = document.createElement("div");
  navbarItems.classList.add("navbar-items");
  const labels = ["About Us", "Menu", "Contract"];

  labels.forEach((label) => {
    const btn = document.createElement("button");
    btn.classList.add("navBtn");
    btn.textContent = label;
    navbarItems.append(btn);
  });

  nav.appendChild(xBtn);
  nav.appendChild(navbarItems);

  header.appendChild(headerLogoContainer);
  header.appendChild(navBurger);
  header.appendChild(nav);

  function onBurgerClick(e) {
    let overlay = document.getElementById("overlay");
    overlay.style.display = overlay.style.display === "none" ? "block" : "none";
    document.getElementById("nav-container").classList.add("showOverlay");
  }
  document.getElementById("hamburger-menu").addEventListener("click", onBurgerClick);
}

/* 
<header id="header">
  <div id="header-logo-container">
	  <button class="img-btn"><img src="./assets/7-leaves-cafe-logo-red-transparent.png" id="header-logo" /></button>
  </div>
  <button class="navbar-hamburger"><i class="fas fa-bars"></i></button>

  <nav class="navbar">
    <a href="javascript:void(0)" id="close-btn" class="close-button mobile">x</a>
    <div class="navbar-items">
      <button class="navBtn">About Us</button>
      <button class="navBtn">Menu</button>
      <button class="navBtn">Contact</button>
    </div>
  </nav>
</header> */
