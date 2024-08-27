import "../styles/about.css";
import beginningImg from "../assets/cold-drink-cart-business-background.jpg";


const createElement = (tag, className, id) => {
  const element = document.createElement(tag);
  if(className) element.classList.add(className);
  if(id) element.id = id;
  return element;
}


export default function createAbout() {
  const content = document.getElementById("content");
  
  // Create element
  const home = document.createElement("div");
  const ourStory = createElement("section", "our-story-header");
  const beginningContainer = createElement("section", "beginning-container");
  const beginTextContainer = createElement("div", "beginning-text-container");
  const beginHeader = createElement("div", "beginning-header");
  const beginningText = createElement("div", "beginning-text");
  const beginImgContainer = createElement("div", "beginning-img-container");
  const missionSection = createElement("section", null, "mission-statement");
  const changeSection = createElement("section", "change");
  const changeTextContainer = createElement("div", "change-text-container");
  

  // Set content
  ourStory.innerHTML = `<h2>Our Story</h2>`;
  beginHeader.innerHTML = `
    <h3 class="accent">7 Leaves Cafe</h3>
    <h2>Our Humble Beginning</h2>
  `;
  beginningText.innerHTML = `
    <p>
      Coffee, Tea, and Goodness are the very essence of what we serve. 
      From the humble beginning in a small 1,100 square foot store located in 
      the heart of Little Saigon, a band of brothers and close friends met in 2011.
    </p>
  `;

  beginImgContainer.innerHTML = `
  <img src=${beginningImg} alt="person holding a large cup of house coffee" />
  `

  
  missionSection.innerHTML = `
    <div class="mission-text-container">
      <h2 class="accent">OUR MISSION</h2>
      <div class="mission-text">
        <p>To enrich the human experience by serving the very best coffee, tea and goodness in every cup, every community.</p>
      </div>
    </div>
  `;
  

  // Combine elements
  beginTextContainer.append(beginHeader, beginningText);
  beginningContainer.append(beginTextContainer, beginImgContainer);

  home.append(ourStory, beginningContainer, missionSection);
  content.append(home);
}


{
  /* 
      <section class="change">
        <div class="change-text-container">

          <div class="change-header">
            <h2 class="accent">7 Leaves Cafe</h2>
            <h2>Be the change you wish to see in the world.</h2>
          </div>

          <div class="change-text">
            <p>
              Hanging on the wall of every 7 Leaves Cafe is a canvas of Gandhi’s famous quotation, “be the change you wish to see in the world.” It is a constant reminder and
              symbol of everything that we do – from how we create our products to the way we serve our customers, it is the very principle that guides us forward.
            </p>
          </div>
          
        </div>
        <div class="change-img-container">
          <img src="./assets/be-the-change-wall-canvas.jpg" alt="3 people holding a large cup of 7 leaves drinks, house coffee, jasmine milk tea, and assam milk tea" />
        </div>
      </section> */
}
