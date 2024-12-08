const overlay = document.getElementById("overlay");
const settingBtn = document.getElementById("setting-btn");
const settingDialog = document.getElementById("setting-dialog");
const closeBtn = document.getElementById("close-button");

const addEventListeners = () => {
  openDialog();
  closeDialog();
};

const openDialog = () => {
  settingBtn.addEventListener("click", () => {
    overlay.style.display = overlay.style.display === "none" ? "block" : "none";
    settingDialog.showModal();
  });
};

const closeDialog = () => {
  closeBtn.addEventListener("click", () => {
    overlay.style.display = overlay.style.display === "none" ? "block" : "none";
    settingDialog.close();
  });
};

export default addEventListeners;
