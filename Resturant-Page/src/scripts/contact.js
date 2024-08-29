import { createElement } from "./helper";
import "../styles/contact.css";

export default function createContact() {
  const content = document.getElementById("content");
  const home = document.createElement("div");

  // Create element
  const contactContainer = createElement("section", "contact-container");
  const contactDiv = createElement("div", "contact");
  const contactHeader = createElement("div", "contact-header");

  // Set content

  contactHeader.appendChild("h3", "accent", null, `CONTACT US`);
}

{
  /* 
  <section class="contact-container">
    <div class="contact">
        <div class="contact-header">
            <h3 class="accent">CONTACT US</h3>
            <h2>Get in Touch</h2>
            <p>We value your feedback, inquiries, and suggestions.</p>
        </div>

        <div class="store-select-container">
            <label for="stores">Choose a Store:</label>
            <select name="stores" id="stores">
                <option value="Carrollton">Carrollton - 2540 Old Denton Road Ste 116</option>
                <option value="Garland">Garland - 519 N Jupiter Rd</option>
                <option value="Grand Prarie">Grand Prairie - 2609 W Pioneer Pkwy #100</option>
            </select>

            <form class="form-container">
                <input type="text" id="name" name="name" placeholder="Name" required />
                <input type="email" id="email" name="email" placeholder="Email" required />
                <textarea placeholder="Message" rows="4"></textarea>
            </form>
            
            <div class="submit-container">
                <button class="submit-btn">Submit</button>
            </div>

        </div>
    </div>

    <div class="contact-img-container">
        <img src="../src/assets/vietnamese-coffee-splash-coffee-beans-ice-scaled.jpg" />
    </div>

</section> */
}
