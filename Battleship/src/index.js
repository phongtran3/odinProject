import "./styles/main.css";
import "./styles/deploy.css";
import "./styles/battle.css";

import createHomePage from "./scripts/pages/home";
import createDeployPage from "./scripts/pages/deploy";

const container = document.getElementById("container");
//createHomePage();
createDeployPage();

// const startBtn = document.getElementById("start-btn");
// startBtn.addEventListener("click", () => {
// 	console.log("Start");
// 	container.textContent = " ";
// 	createDeployPage();
// });
