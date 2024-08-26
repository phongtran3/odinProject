import "../styles/home.css";

const menuItemsArray = [
  {
    name: "Coffee",
    image: "../src/assets/House-Coffee.jpg",
  },
  {
    name: "Milk Tea",
    image: "../src/assets/Mung-Bean-Milk-Tea.jpg",
  },
  {
    name: "Tea",
    image: "../src/assets/Sea-Cream-Tea-Jasmine.jpg",
  },
];

export default function createHome() {
  const content = document.getElementById("content");

  //MISSION STATEMENT
  const missionSection = document.createElement("section");
  missionSection.id = "mission-statement";

  const missionTextContainer = document.createElement("div");
  missionTextContainer.classList.add("mission-text-container");

  const missionText = document.createElement("div");
  missionText.classList.add("mission-text");

  const missionTitle = document.createElement("h2");
  missionTitle.classList.add("accent");

  const missionP = document.createElement("p");

  missionTitle.textContent = "OUR MISSION";
  missionP.textContent = "To enrich the human experience by serving the very best coffee, tea and goodness in every cup, every community.";

  missionTextContainer.append(missionTitle, missionP);
  missionSection.append(missionTextContainer);

  //PREVIEW GALLERY
  const menuPreviewGallery = document.createElement("section");
  menuPreviewGallery.id = "menu-preview-gallery";

  const leftBtn = document.createElement("button");
  leftBtn.classList.add("arrow", "left-arrow");
  const leftIcon = document.createElement("i");
  leftIcon.classList.add("fas", "fa-arrow-left");
  leftBtn.append(leftIcon);

  const rightBtn = document.createElement("button");
  rightBtn.classList.add("arrow", "right-arrow");
  const rightIcon = document.createElement("i");
  rightIcon.classList.add("fas", "fa-arrow-right");
  rightBtn.append(rightIcon);

  menuPreviewGallery.append(leftBtn);

  menuItemsArray.forEach((item) => {
    const menuItemDiv = document.createElement("div");
    menuItemDiv.classList.add("menu-item");
    menuItemDiv.style.backgroundImage = `url(${item.image})`;

    const menuItemText = document.createElement("div");
    menuItemText.classList.add("menu-item-text");
    menuItemText.textContent = item.name;

    const fadeOverlay = document.createElement("div");
    fadeOverlay.classList.add("fade-overlay");

    menuItemDiv.append(menuItemText, fadeOverlay);
    menuPreviewGallery.append(menuItemDiv);
  });
  menuPreviewGallery.append(rightBtn);

  content.append(missionSection, menuPreviewGallery);
}

{
  /* 
	<section id="menu-preview-gallery">
	<button class="arrow left-arrow"><i class="fas fa-arrow-left"></i></button>
	<div class="menu-item">
	  <div class="menu-item-text">Coffee</div>
	  <div class="fade-overlay"></div>
	</div>

	<div class="menu-item" style="background-image: url(./assets/Mung-Bean-Milk-Tea.jpg)">
	  <div class="menu-item-text">Milk Tea</div>
	  <div class="fade-overlay"></div>
	</div>

	<div class="menu-item" style="background-image: url(./assets/Sea-Cream-Tea-Jasmine.jpg)">
	  <div class="menu-item-text">Tea</div>
	  <div class="fade-overlay"></div>
	</div>
	<button class="arrow right-arrow"><i class="fas fa-arrow-right"></i></button>
</section> 
*/
}
