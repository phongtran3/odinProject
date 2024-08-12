import "./styles/main.css"; //header and footer css'
import createHome from "./scripts/home";
import contact from "./scripts/contact";
import menu from "./scripts/menu";
import about from "./scripts/contact";
import createHeader from "./scripts/header";
import createFooter from "./scripts/footer";
import { onOverlayClick } from "./scripts/helper";

createHeader();

const content = document.getElementById("content");

const aboutUsBtn = document.getElementById("about-us");
aboutUsBtn.addEventListener("click", (e) => {
  onOverlayClick();
  content.firstElementChild.remove();
});

const menuBtn = document.getElementById("menu");
menuBtn.addEventListener("click", (e) => {
  onOverlayClick();
});
const contactBtn = document.getElementById("contact-us");
contactBtn.addEventListener("click", (e) => {
  onOverlayClick();
});

createFooter();
