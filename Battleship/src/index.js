import "./styles/main.css";
import "./styles/deploy.css";
import "./styles/battle.css";

import createHome from "./scripts/pages/home";
import createDeploy from "./scripts/pages/deploy";

const container = document.getElementById("container");
createHome();

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", () => {
	console.log("Start");
	container.textContent = " ";
	createDeploy();
});
