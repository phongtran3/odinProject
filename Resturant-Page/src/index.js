import "./styles/main.css"; //header and footer css'
import createHome from "./scripts/home";
import contact from "./scripts/contact";
import menu from "./scripts/menu";
import about from "./scripts/contact";
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
  createFooter();
});

const menuBtn = document.getElementById("menu");
menuBtn.addEventListener("click", (e) => {
  onOverlayClick();
  content.textContent = " ";

  createFooter();
});

const contactBtn = document.getElementById("contact-us");
contactBtn.addEventListener("click", (e) => {
  onOverlayClick();
  content.textContent = " ";

  createFooter();
});

const homeIconBtn = document.getElementById("header-logo");
homeIconBtn.addEventListener("click", (e) => {
  content.textContent = " ";
  createHome();
  createFooter();
});
