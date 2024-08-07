import logo from "../assets/7-leaves-cafe-logo-red-transparent.png";

export default function createHeader() {
  console.log("test");
  const header = document.getElementById("header");
  const headerLogoContainer = document.createElement("div");
  const logoImg = document.createElement("img");
  const logoBtn = document.createElement("button");

  headerLogoContainer.id = "header-logo-container";
  logoBtn.classList.add("img-btn");
  logoImg.src = logo;
  logoBtn.appendChild(logoImg);
  headerLogoContainer.appendChild(logoBtn);

  const navBurger = document.createElement("button");
  const burgerIcon = document.createElement("i");
  navBurger.classList.add("navbar-hamburger");
  burgerIcon.classList.add("fas", "fa-bars");
  navBurger.appendChild(burgerIcon);

  const nav = document.createElement("nav");
  nav.classList.add("navbar");

  const xBtn = document.createElement("a");
  xBtn.id = "close-btn";
  xBtn.classList.add("closse-button");
  nav.appendChild(xBtn);

  header.appendChild(headerLogoContainer);
  header.appendChild(navBurger);
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
