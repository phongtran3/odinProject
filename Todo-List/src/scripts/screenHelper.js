import { parse, isBefore } from "date-fns";
const sideBarContainer = document.getElementById("side-bar-container");
const projectErrorMsg = document.getElementById("project-error");
const taskErrorMsg = document.getElementById("task-error");
const deleteDialog = document.getElementById("delete-dialog-container");

export const toggleShowOverlay = () => {
  if (sideBarContainer.classList.contains("showOverlay")) {
    sideBarContainer.classList.toggle("showOverlay");
    overlay.classList.remove("full-overlay");
  }
  overlay.style.display = "none";
};

export const closeFormDialog = (form, dialog) => {
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
  deleteDialog.removeAttribute("type");
    deleteDialog.removeAttribute("title");
    deleteDialog.removeAttribute("task-id");
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


export const isDatePast = (dueDate) => {
  const today = new Date();
  let parseDueDate = parse(dueDate, "MM/dd/yyyy", new Date());

  const isPast = isBefore(parseDueDate, today);
  return isPast;
}