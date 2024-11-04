import taskManager from "./taskManager.js";
import addEventListeners from "./eventListener.js";
import { closeDialog, checkMobileOverlay } from "./screenHelper.js";
import trashIcon from "../assets/svgs/trash.svg";
import editIcon from "../assets/svgs/edit.svg";

import { format } from "date-fns";

export default function screenManager() {
  console.log("Screen Manager");

  addEventListeners();
  const overlay = document.getElementById("overlay");
  const navProjects = document.getElementById("nav-project-items");
  const addProjectBtn = document.getElementById("add-project-btn");

  const app = taskManager();
  app.initialLoad();

  //update screen function
  const updateScreen = () => {
    updateProjects();
  };

  const updateProjects = () => {
    console.log("Updating projects...");
    let projects = app.getAllProjects();
    projects.forEach((project) => {
      navProjects.appendChild(createProjectElement(project));
    });
  };

  //Handle adding/canceling new projects
  const handleNewProject = () => {
    console.log("Adding new project...");
    const newProjectDialog = document.getElementById("new-project-dialog-container");
    const newProjectForm = document.querySelector(".add-project-form");
    const projectCancelBtn = newProjectForm.querySelector(".cancel-btn");
    const projectErrorMsg = document.getElementById("project-error");

    checkMobileOverlay();

    const cancelNewProject = () => {
      console.log("Canceling New Project...");
      closeDialog(newProjectForm, newProjectDialog);
    };

    const sumbitNewProject = (e) => {
      e.preventDefault();

      const projectTitle = newProjectForm.querySelector(".new-project").value.trim();

      if (app.getProject(projectTitle)) {
        console.log("Error");
        projectErrorMsg.style.display = "block";
      } else {
        console.log("Submiting New Project...");
        app.addProject(projectTitle);
        updateScreen();
        closeDialog(newProjectForm, newProjectDialog);
      }
    };

    newProjectDialog.showModal();
    projectCancelBtn.addEventListener("click", cancelNewProject);
    newProjectForm.addEventListener("submit", sumbitNewProject);
  };

  const createProjectElement = (project) => {
    const navItem = document.createElement("li");
    const projectTitleDiv = document.createElement("div");
    const projectBtnsDiv = document.createElement("div");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    navItem.classList.add("nav-item");

    projectTitleDiv.classList.add("project-title");
    projectTitleDiv.innerHTML = `
      <h3 title=${project.title}>${project.title}</h3>
    `;

    editBtn.id = "edit-project";
    editBtn.innerHTML = `
      <img class="icon-svg" src="${editIcon}" />
    `;

    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = `
      <img class="icon-svg" src="${trashIcon}">
    `;
    projectBtnsDiv.classList.add("project-btns");
    projectBtnsDiv.append(editBtn, deleteBtn);
    navItem.append(projectTitleDiv, projectBtnsDiv);
    return navItem;
  };

  addProjectBtn.addEventListener("click", handleNewProject);
}
