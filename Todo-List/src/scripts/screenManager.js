import taskManager from "./taskManager.js";
import addEventListeners from "./eventListener.js";

import { format } from "date-fns";

export default function screenManager() {
  console.log("Screen Manager");
  addEventListeners();
  const overlay = document.getElementById("overlay");
  const sideBarContainer = document.getElementById("side-bar-container");

  const addProjectBtn = document.getElementById("add-project-btn");

  const app = taskManager();
  app.initialLoad();

  //update screen function?

  const closeDialog = (form, dialog) => {
    form.reset();
    dialog.close();
    overlay.style.display = "none";

    if (sideBarContainer.classList.contains("showOverlay")) {
      sideBarContainer.classList.toggle("showOverlay");
      overlay.classList.remove("full-overlay");
    }
  };

  const checkMobileOverlay = () => {
    if (sideBarContainer.classList.contains("showOverlay")) {
      overlay.classList.add("full-overlay");
    } else {
      overlay.style.display = overlay.style.display === "none" ? "block" : "none";
    }
  };

  //Handle adding/canceling new projects
  const handleNewProject = () => {
    console.log("Adding new project...");
    const newProjectDialog = document.getElementById("new-project-dialog-container");
    const newProjectForm = document.querySelector(".add-project-form");
    const projectCancelBtn = newProjectForm.querySelector(".cancel-btn");

    checkMobileOverlay();

    const cancelNewProject = () => {
      console.log("Canceling New Project...");
      closeDialog(newProjectForm, newProjectDialog);
    };

    const sumbitNewProject = (e) => {
      console.log("Submiting New Project...");
      e.preventDefault();

      const projectTitle = newProjectForm.querySelector(".new-project").value.trim();
      app.addProject(projectTitle);

      closeDialog(newProjectForm, newProjectDialog);
    };

    newProjectDialog.showModal();
    projectCancelBtn.addEventListener("click", cancelNewProject);
    newProjectForm.addEventListener("submit", sumbitNewProject);
  };

  addProjectBtn.addEventListener("click", handleNewProject);
}
