import "../styles/menu.css";
import { createElement } from "./helper";
import { coffeeMenu, teaMenu, milkTeaMenu, addOnMenu } from "./menuArrays";

function createItemCard(name, src, description) {
  const itemCard = createElement("div", "menu-item-card");
  const itemCardImgDiv = createElement("div", "item-card-image");
  const itemCardText = createElement("div", "item-card-text");
  const itemCardDesc = createElement("div", "item-card-description");

  itemCardImgDiv.innerHTML = `<img src=${src} />`;

  itemCardText.innerHTML = `
    <div class="item-card-name">
      <h3>${name}</h3>
    </div>
  `;

  itemCardDesc.innerHTML = `<p>${description}</p>`;

  itemCard.append(itemCardImgDiv, itemCardText, itemCardDesc);
  return itemCard;
}

export default function createMenu() {
  const content = document.getElementById("content");
  const home = document.createElement("div");

  // Create element
  const menuHeaderContainer = createElement("section", "menu-header-container");
  const coffeesContainer = createElement("section", "menu-item-container");
  const teaContainer = createElement("section", "menu-item-container");
  const milkTeaContainer = createElement("section", "menu-item-container");
  const addOnContainer = createElement("section", "menu-item-container");

  const menuCategories = [
    {
      name: "Coffee",
      container: coffeesContainer,
      array: coffeeMenu,
    },
    {
      name: "Tea",
      container: teaContainer,
      array: teaMenu,
    },
    {
      name: "Milk Tea",
      container: milkTeaContainer,
      array: milkTeaMenu,
    },
    {
      name: "Add-ons",
      container: addOnContainer,
      array: addOnMenu,
    },
  ];

  // Set content
  menuHeaderContainer.appendChild(createElement("h3", "accent", null, `DRINKS`));
  menuHeaderContainer.appendChild(createElement("h2", null, null, `Flavors that Bridge Continents`));
  const menuHeaderP = document.createElement("p");
  menuHeaderP.innerHTML = `
      <strong>OUR WAY OF DOING THINGS.</strong>
      From our kitchen – we chop, peel, cook, stir, and press by hand in order to extract real flavors from raw ingredients such as fresh pandan leaves, mung bean, taro root,
      and passion fruit.
  `;
  menuHeaderContainer.appendChild(menuHeaderP);

  menuCategories.forEach((item) => {
    const menuItemHeadContainer = createElement("div", "menu-item-header-container");
    menuItemHeadContainer.innerHTML = `
      <span class="menu-item-header">
        <h3>${item.name}</h3>
      </span>
    `;

    const menuItemGrid = createElement("grid", "menu-item-grid");

    // Menu Array
    item.array.forEach((item) => {
      let card = createItemCard(item.name, item.imgSrc, item.description);
      menuItemGrid.appendChild(card);
    });

    item.container.append(menuItemHeadContainer, menuItemGrid);
  });

  // Combine elements

  home.append(menuHeaderContainer);
  menuCategories.forEach((item) => {
    home.appendChild(item.container);
  });
  content.append(home);
}
