import "../styles/menu.css";
import { createElement } from "./helper";




export default function createMenu() {
  const content = document.getElementById("content");
  const home = document.createElement("div");

  // Create element
  const menuHeaderContainer = createElement("section", "menu-header-container");


  // Set content
  menuHeaderContainer.appendChild(createElement("h3", "accent", null, `DRINKS`));
  menuHeaderContainer.appendChild(createElement("h2", null , null, `Flavors that Bridge Continents`));
  const menuHeaderP = document.createElement("p");
  menuHeaderP.innerHTML = `
    <strong>OUR WAY OF DOING THINGS.</strong>
      From our kitchen – we chop, peel, cook, stir, and press by hand in order to extract real flavors from raw ingredients such as fresh pandan leaves, mung bean, taro root,
      and passion fruit.
  `
  menuHeaderContainer.appendChild(menuHeaderP);


  // Combine elements

  home.append(menuHeaderContainer);
  content.append(home);
}




{
  /* 
  <section class="coffees-container">

    <div class="menu-item-header-container">
      <span class="menu-item-header">
        <h3>Coffee</h3>
      </span>
    </div>

    <div class="menu-item-grid">

      <div class="menu-item-card">

        <div class="item-card-image">
          <img src="./assets/House-Coffee.jpg" alt="a cup of vietnamese coffee" />
        </div>

        <div class="item-card-text">

          <div class="item-card-name">
            <h3>House Coffee</h3>
          </div>

          <div class="item-card-description">
            <p>
              Perfected over the time span of a hundred years, Cafe Sua Da has become one of the world’s most refined and popular drinks. Using our secret brewing technique and
              the finest coffee beans in the world
            </p>
          </div>

        </div>

      </div>

      <div class="menu-item-card">

        <div class="item-card-image">
          <img src="./assets/Vietnamese-Coffee.jpg" alt="a cup of vietnamese coffee" />
        </div>

        <div class="item-card-text">

          <div class="item-card-name">
            <h3>Vietnamse Coffee</h3>
          </div>

          <div class="item-card-description">
            <p>
              Strong coffee with sweetened condensed milk and chilled on ice makes an unbeatable Southeast Asian treat. Even those who only take their coffee black will like
              this
            </p>
          </div>

        </div>

      </div>

      <div class="menu-item-card">

        <div class="item-card-image">
          <img src="./assets/Sea-Cream-Black-Coffee.jpg" alt="a cup of vietnamese coffee" />
        </div>
        
        <div class="item-card-text">
          <div class="item-card-name">
            <h3>Sea Cream Black Coffee</h3>
          </div>
          <div class="item-card-description">
            <p>Coffee is known for many things — but refreshment is not one of them. Until now. Our Sea Cream Black Coffee is the yin and yang to coffee refinement.</p>
          </div>
        </div>
      </div>

      <div class="menu-item-card">
        <div class="item-card-image">
          <img src="./assets/Mint-Serrano.jpg" alt="a cup of vietnamese coffee" />
        </div>
        <div class="item-card-text">
          <div class="item-card-name">
            <h3>Mint Sereno</h3>
          </div>
          <div class="item-card-description">
            <p>The Mint Sereno blend is made from fresh mint, real cream and brown sugar.</p>
          </div>
        </div>
      </div>

    </div>
  </section>

      <section class="milk-tea-container"></section>
      <section class="tea-container"></section> */
}
