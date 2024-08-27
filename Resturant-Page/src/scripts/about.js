import "../styles/about.css";

export default function createAbout() {
  const content = document.getElementById("content");
  const home = document.createElement("div");

  const ourStory = document.createElement("section");
  ourStory.classList.add("our-story-header");

  const ourStoryH2 = document.createElement("h2");
  ourStoryH2.textContent = "Our Story";
  ourStory.append(ourStoryH2);

  const beginningContainer = document.createElement("section");
  beginningContainer.classList.add("beginning-container");

  const beginTextContainer = document.createElement("div");
  beginTextContainer.classList.add("beginning-text-container");

  const beginHeader = document.createElement("div");
  beginHeader.classList.add("beginning-header");

  const beginHeaderH3 = document.createElement("h3");
  beginHeaderH3.classList.add("accent");
  beginHeaderH3.textContent = "7 Leaves Cafe";

  const beginHeaderH2 = document.createElement("h2");
  beginHeaderH2.textContent = "Our Humble Beginning";

  beginHeader.append(beginHeaderH3, beginHeaderH2);

  const beginningText = document.createElement("div");
  beginningText.classList.add("beginning-text");

  const beginningTextP = document.createElement("p");
  beginningTextP.textContent = `Coffee, Tea, and Goodness are the very essence of what we serve. From the humble beginning in a small 1,100 square foot store located in the heart of Little Saigon, a band of brothers and close friends met in 2011.`;

  beginningText.append(beginningTextP);
  beginTextContainer.append(beginHeader, beginningText);
  beginningContainer.append(beginTextContainer);

  home.append(ourStory, beginningContainer);
  content.append(home);
}

{
  /* <section class="our-story-header">
        <h2>Our Story</h2>
      </section>

      <section class="beginning-container">
        <div class="beginning-text-container">
          <div class="beginning-header">
            <h3 class="accent">7 Leaves Cafe</h3>
            <h2>Our Humble Beginning</h2>
          </div>
          <div class="beginning-text">
            <p>
              Coffee, Tea, and Goodness are the very essence of what we serve. From the humble beginning in a small 1,100 square foot store located in the heart of Little Saigon, a
              band of brothers and close friends met in 2011.
            </p>
          </div>
        </div>

        <div class="beginning-img-container">
          <img src="./assets/cold-drink-cart-business-background.jpg" alt="person holding a large cup of house coffee" />
        </div>
      </section>

      <section id="mission-statement">
        <div class="mission-text-container">
          <h2 class="accent">OUR MISSION</h2>
          <div class="mission-text">
            <p>"To enrich the human experience by serving the very best coffee, tea and goodness in every cup, every community."</p>
          </div>
        </div>
      </section>

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
