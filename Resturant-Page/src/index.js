import "./styles/main.css"; //header and footer css'
import createHome from "./scripts/home";
import createMenu from "./scripts/menu";
import createContact from "./scripts/contact";
import createAbout from "./scripts/about";
import createHeader from "./scripts/header";
import createFooter from "./scripts/footer";
import { onOverlayClick } from "./scripts/helper";

createHeader();
createHome();
createFooter();

const content = document.getElementById("content");

const aboutUsBtn = document.getElementById("about-us");
aboutUsBtn.addEventListener("click", (e) => {
  onOverlayClick();
  content.textContent = " ";
  createAbout();
  createFooter();
});

const menuBtn = document.getElementById("menu");
menuBtn.addEventListener("click", (e) => {
  onOverlayClick();
  content.textContent = " ";
  createMenu();
  createFooter();
});

const contactBtn = document.getElementById("contact-us");
contactBtn.addEventListener("click", (e) => {
  onOverlayClick();
  content.textContent = " ";
  createContact();
  createFooter();
});

const homeIconBtn = document.getElementById("header-logo");
homeIconBtn.addEventListener("click", (e) => {
  console.log("home");
  content.textContent = " ";
  createHome();
  createFooter();
});
