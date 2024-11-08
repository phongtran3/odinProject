import taskManager from "./taskManager.js";
import addEventListeners from "./eventListener.js";
import { cancelFormDialogs, checkMobileOverlay, closeDeleteDialog } from "./screenHelper.js";
import trashIcon from "../assets/svgs/trash.svg";
import editIcon from "../assets/svgs/edit.svg";

import { format } from "date-fns";

export default function screenManager() {
  console.log("Screen Manager");

  addEventListeners();
  const overlay = document.getElementById("overlay");

  const newProjectDialog = document.getElementById("new-project-dialog-container");
  const newProjectForm = document.getElementById("add-project-form");
  const projectCancelBtn = newProjectForm.querySelector(".cancel-btn");
  const projectErrorMsg = document.getElementById("project-error");
  const projectDialogTitle = document.getElementById("project-dialog-title");
  const navProjects = document.getElementById("nav-project-items");
  const addProjectBtn = document.getElementById("add-project-btn");

  const newTaskDialog = document.getElementById("task-dialog-container");
  const newTaskForm = document.getElementById("task-form");
  const taskCancelBtn = newTaskForm.querySelector(".cancel-btn");
  const addNewTaskBtn = document.getElementById("add-task-btn");

  const deleteDialog = document.getElementById("delete-dialog-container");
  const deleteBtns = document.querySelectorAll(".delete-btn");
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");

  let currentProjectTitle = "";

  const app = taskManager();
  app.initialLoad();

  //update screen function
  const updateScreen = () => {
    console.log("Updating Screen...");
    navProjects.textContent = "";
    updateProjects();
  };

  const updateProjects = () => {
    console.log("Updating projects...");
    let projects = app.getAllProjects();
    projects.forEach((project) => {
      navProjects.appendChild(createProjectElement(project));
    });
  };

  //Submit New Project or Edit Existing Project Name
  const sumbitNewProject = (e) => {
    e.preventDefault();
    const projectTitle = newProjectForm.querySelector(".new-project").value.trim();
    console.log(projectTitle);
    if (app.getProject(projectTitle)) {
      console.log("Error");
      projectErrorMsg.style.display = "block";
      return;
    }

    if (projectDialogTitle.textContent === "Adding New Project") {
      console.log("Submiting New Project...");
      app.addProject(projectTitle);
      updateScreen();
      cancelFormDialogs(newProjectForm, newProjectDialog);
    } else {
      console.log("Editing New Project...");
      app.editProjectName(currentProjectTitle, projectTitle);
      updateScreen();
      cancelFormDialogs(newProjectForm, newProjectDialog);
    }
  };

  //Handle Opening Project Dialog for Adding/Editing Project
  const openProjectDialog = (title, projectName) => {
    checkMobileOverlay();
    projectDialogTitle.textContent = title;
    if (projectName) {
      const projectNameInput = document.querySelector(".new-project");
      projectNameInput.value = projectName;
    }
    newProjectDialog.showModal();
  };

  //Handle Opening Project for Editing
  const handleEditProject = (e) => {
    console.log("Editing Project...");
    const button = e.currentTarget;
    const projectItem = button.closest(".nav-item");
    const projectTitle = projectItem.querySelector(".project-title h3");
    currentProjectTitle = projectTitle.textContent;
    openProjectDialog("Editing Project", projectTitle.textContent);
  };

  //Creating Nav Project Element
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

    editBtn.classList.add("edit-project");
    editBtn.innerHTML = `
      <img class="icon-svg" src="${editIcon}" />
    `;

    deleteBtn.classList.add("delete-btn");
    deleteBtn.setAttribute("data-type", "project");
    deleteBtn.innerHTML = `
      <img class="icon-svg" src="${trashIcon}">
    `;

    projectBtnsDiv.classList.add("project-btns");
    projectBtnsDiv.append(editBtn, deleteBtn);
    navItem.append(projectTitleDiv, projectBtnsDiv);

    editBtn.addEventListener("click", handleEditProject);
    deleteBtn.addEventListener("click", () => openDeleteProjectDialog("project", project.title));
    return navItem;
  };

  //Delete Dialog
  const openDeleteProjectDialog = (type, name) => {
    console.log(`Attemping to delete ${type} ${name}`);
    currentProjectTitle = name;
    checkMobileOverlay();
    deleteDialog.querySelector("h4").textContent = `Are you sure you want to delete this ${type}?`;
    deleteDialog.showModal();
  };

  //Handle deleting project
  const handleDeleteProject = () => {
    app.deleteProject(currentProjectTitle);
    updateScreen();
    closeDeleteDialog(deleteDialog);
  };

  //Handle Opening New Task Dialog
  const openNewTaskDialog = () => {
    console.log("Adding New Task...");
    checkMobileOverlay();
    newTaskDialog.showModal();
  };

  const handleNewTask = (e) => {
    console.log("Submiting New Task...");
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("title"));
  };

  //Event Listener Declariations
  addProjectBtn.addEventListener("click", () => openProjectDialog("Adding New Project"));
  projectCancelBtn.addEventListener("click", () => cancelFormDialogs(newProjectForm, newProjectDialog));

  newProjectForm.addEventListener("submit", sumbitNewProject);

  //deleteBtns.forEach((btn) => btn.addEventListener("click", handleDeleteDialog));
  noBtn.addEventListener("click", () => closeDeleteDialog(deleteDialog));
  yesBtn.addEventListener("click", handleDeleteProject);

  addNewTaskBtn.addEventListener("click", openNewTaskDialog);
  taskCancelBtn.addEventListener("click", () => cancelFormDialogs(newTaskForm, newTaskDialog));
  newTaskForm.addEventListener("submit", handleNewTask);

  //initial load
  updateScreen();
}
