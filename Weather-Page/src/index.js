console.log("Weather Page")

import checkStorage from "./scripts/checkStorage.js";


const overlay = document.getElementById("overlay");
const settingBtn = document.getElementById("setting-btn");
const settingDialog = document.getElementById("setting-dialog");
const closeBtn = document.getElementById("close-button");


settingBtn.addEventListener("click", () => {
    overlay.style.display = overlay.style.display === "none" ? "block" : "none";
    settingDialog.showModal();
})

closeBtn.addEventListener("click", () => {
    overlay.style.display = overlay.style.display === "none" ? "block" : "none";
    settingDialog.close();
})


//Load units from storage
const initialLoad = () => {

}

const updateLocalStorage = () => {

}