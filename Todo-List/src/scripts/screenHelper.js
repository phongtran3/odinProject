const sideBarContainer = document.getElementById("side-bar-container");
const projectErrorMsg = document.getElementById("project-error");

export const closeProjectDialog = (form, dialog) => {
  form.reset();
  dialog.close();
  overlay.style.display = "none";
  projectErrorMsg.style.display = "none";

  if (sideBarContainer.classList.contains("showOverlay")) {
    sideBarContainer.classList.toggle("showOverlay");
    overlay.classList.remove("full-overlay");
  }
};

export const closeDeleteDialog = (form) => {
  form.close();
  overlay.style.display = "none";
  if (sideBarContainer.classList.contains("showOverlay")) {
    sideBarContainer.classList.toggle("showOverlay");
    overlay.classList.remove("full-overlay");
  }
};

export const checkMobileOverlay = () => {
  if (sideBarContainer.classList.contains("showOverlay")) {
    overlay.classList.add("full-overlay");
  } else {
    overlay.style.display = overlay.style.display === "none" ? "block" : "none";
  }
};
