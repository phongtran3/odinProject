import { createElement } from "./helper";
import "../styles/contact.css";
import contactImg from "../assets/vietnamese-coffee-splash-coffee-beans-ice-scaled.jpg"

export default function createContact() {
    const content = document.getElementById("content");
    const home = document.createElement("div");

    // Create element
    const contactContainer = createElement("section", "contact-container");
    const contactDiv = createElement("div", "contact");
    const contactHeader = createElement("div", "contact-header");
    const selectStoreDiv = createElement("div", "select-store-container");
    const label = document.createElement("label");
    const select = document.createElement("select");
    const form = createElement("form", "form-container");
    const contactImgContainer = createElement("div", "contact-img-container");

    // Set content
    contactHeader.appendChild(createElement("h3", "accent", null, `CONTACT US`));
    contactHeader.appendChild(createElement("h2", null , null, `Get in Touch`));
    contactHeader.appendChild(createElement("p", null , null, `We value your feedback, inquiries, and suggestions.`));
  


    label.setAttribute("for", "stores");
    label.textContent = "Choose a Store:";

    select.name = "stores";
    select.id = "stores";
    select.innerHTML = `
        <option value="Carrollton">Carrollton - 2540 Old Denton Road Ste 116</option>
        <option value="Garland">Garland - 519 N Jupiter Rd</option>
        <option value="Grand Prarie">Grand Prairie - 2609 W Pioneer Pkwy #100</option>
    `
    form.innerHTML = `
        <input type="text" id="name" name="name" placeholder="Name" required />
        <input type="email" id="email" name="email" placeholder="Email" required />
        <textarea placeholder="Message" rows="4"></textarea>
    `
    contactImgContainer.innerHTML = `
        <img src=${contactImg} alt="vietnamese coffee being poured and splashed into a cup" />
    `
    

    // Combine elements
    selectStoreDiv.append(label, select, form);
    contactDiv.append(contactHeader, selectStoreDiv);

    contactContainer.append(contactDiv, contactImgContainer);
    home.append(contactContainer)
    content.append(home);
}

