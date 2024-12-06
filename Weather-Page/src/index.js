console.log("Weather Page")

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


