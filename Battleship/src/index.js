import "./styles/main.css";
import "./styles/deploy.css";
import "./styles/battle.css";

import createHomePage from "./scripts/pages/home";
import createDeployPage from "./scripts/pages/deploy";
import createBattlePage from "./scripts/pages/battle";

const container = document.getElementById("container");
createHomePage();
// createDeployPage();
//createBattlePage();

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", () => {
	container.textContent = " ";
	createDeployPage();
});
