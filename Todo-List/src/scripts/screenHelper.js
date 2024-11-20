const sideBarContainer = document.getElementById("side-bar-container");
const projectErrorMsg = document.getElementById("project-error");
const taskErrorMsg = document.getElementById("task-error");

export const toggleShowOverlay = () => {
  if (sideBarContainer.classList.contains("showOverlay")) {
    sideBarContainer.classList.toggle("showOverlay");
    overlay.classList.remove("full-overlay");
  }
  overlay.style.display = "none";
};

export const closeFormDialog = (form, dialog) => {
  console.log("Closing Dilaog...");
  form.reset();
  dialog.close();
  overlay.style.display = "none";
  projectErrorMsg.style.display = "none";
  taskErrorMsg.style.display = "none";

  toggleShowOverlay();
};

export const closeDeleteDialog = (form) => {
  form.close();
  overlay.style.display = "none";
  toggleShowOverlay();
};

export const checkMobileOverlay = () => {
  if (sideBarContainer.classList.contains("showOverlay")) {
    overlay.classList.add("full-overlay");
  } else {
    overlay.style.display = overlay.style.display === "none" ? "block" : "none";
  }
};

export const NavFilter = Object.freeze({
  ALL: Symbol.for("All"),
  TODAY: Symbol.for("Today"),
  WEEK: Symbol.for("This Week"),
  MONTH: Symbol.for("This Month"),
  COMPLETED: Symbol.for("Completed Tasks"),
  PROJECT: Symbol.for("Project"),
});
