import taskManager from "./taskManager.js";
import addEventListeners from "./eventListener.js";
import { NavFilter, closeFormDialog, checkMobileOverlay, toggleShowOverlay, closeDeleteDialog } from "./screenHelper.js";
import trashIcon from "../assets/svgs/trash.svg";
import editIcon from "../assets/svgs/edit.svg";

import { parseISO, format } from "date-fns";

export default function screenManager() {
  console.log("Screen Manager");

  addEventListeners();

  const newProjectDialog = document.getElementById("new-project-dialog-container");
  const newProjectForm = document.getElementById("add-project-form");
  const projectCancelBtn = newProjectForm.querySelector(".cancel-btn");
  const projectErrorMsg = document.getElementById("project-error");
  const projectDialogTitle = document.getElementById("project-dialog-title");
  const navProjects = document.getElementById("nav-project-items");
  const addProjectBtn = document.getElementById("add-project-btn");

  const taskDialog = document.getElementById("task-dialog-container");
  const newTaskForm = document.getElementById("task-form");
  const taskCancelBtn = newTaskForm.querySelector(".cancel-btn");
  const addNewTaskBtn = document.getElementById("add-task-btn");
  const taskErrorMsg = document.getElementById("task-error");
  const projectOptions = document.querySelector('select[name="project"]');

  const deleteDialog = document.getElementById("delete-dialog-container");
  const deleteBtns = document.querySelectorAll(".delete-btn");
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");

  const taskListContainer = document.getElementById("task-list-container");
  const mainHeader = document.getElementById("main-header");

  const allTasks = document.getElementById("all-tasks");
  const todayTasks = document.getElementById("today-tasks");
  const weekTasks = document.getElementById("week-tasks");
  const monthTasks = document.getElementById("month-tasks");
  const completedTasks = document.getElementById("completed-tasks");

  let currentProjectTitle = "";
  let currentTaskTitle = "";
  let currentTaskID = "";
  let deleteType = "";
  let editTask = false;
  let selectedNavFilter = NavFilter.ALL;
  let activeNavItem = allTasks;
  activeNavItem.classList.add("task-active");

  const app = taskManager();
  app.initialLoad();

  //update screen function
  const updateScreen = () => {
    console.log("Updating Screen...");
    navProjects.textContent = "";
    projectOptions.textContent = "";
    taskListContainer.textContent = "";
    updateProjects();
    updateMainHeader();
    updateTaskContainer();
  };

  const updateMainHeader = () => {
    let header = "";
    mainHeader.textContent = "";

    switch (selectedNavFilter) {
      case NavFilter.ALL:
      case NavFilter.TODAY:
      case NavFilter.WEEK:
      case NavFilter.MONTH:
      case NavFilter.COMPLETED:
        header = Symbol.keyFor(selectedNavFilter);
        break;
      case NavFilter.PROJECT:
        header = currentProjectTitle ? currentProjectTitle : "";
        break;
      default:
        return;
    }
    mainHeader.textContent = header;
  };

  const updateTaskContainer = () => {
    let taskArr;

    switch (selectedNavFilter) {
      case NavFilter.ALL:
        taskArr = app.getAllTasks();
        break;
      case NavFilter.TODAY:
        taskArr = app.getTodayTasks();
        break;
      case NavFilter.WEEK:
        taskArr = app.getWeekTasks();
        break;
      case NavFilter.MONTH:
        taskArr = app.getMonthTasks();
        break;
      case NavFilter.COMPLETED:
        taskArr = app.getCompletedTasks();
        break;
      case NavFilter.PROJECT:
        taskArr = app.getProject(currentProjectTitle).getTasks();
        break;
      default:
        return;
    }

    taskArr.sort((a, b) => {
      if (a.done !== b.done) {
        return a.done - b.done;
      }

      return parseISO(a.dueDate) - parseISO(b.dueDate);
    });
    taskArr.forEach((task) => {
      taskListContainer.appendChild(createTaskElement(task));
    });
  };

  const updateProjects = () => {
    console.log("Updating projects...");
    let projects = app.getAllProjects();
    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "--Select a Project--";
    projectOptions.appendChild(defaultOption);

    projects.forEach((project) => {
      navProjects.appendChild(createProjectElement(project));
      let option = document.createElement("option");
      option.value = project.title;
      option.textContent = project.title;
      projectOptions.appendChild(option);
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
      closeFormDialog(newProjectForm, newProjectDialog);
    } else {
      console.log("Editing New Project...");
      app.editProjectName(currentProjectTitle, projectTitle);
      updateScreen();
      closeFormDialog(newProjectForm, newProjectDialog);
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

  //Handle clicking project on nav container
  const handleProjectClick = (e) => {
    activeNavItem.classList.remove("task-active");
    const title = e.currentTarget.querySelector("h3");
    selectedNavFilter = NavFilter.PROJECT;
    currentProjectTitle = title.textContent.trim();
    updateScreen();
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

    projectTitleDiv.addEventListener("click", handleProjectClick);

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
    deleteBtn.addEventListener("click", () => openDeleteDialog("project", project.title));
    return navItem;
  };

  //Delete Dialog
  const openDeleteDialog = (type, name) => {
    deleteType = type;
    if (type === "project") currentProjectTitle = name;
    deleteDialog.querySelector("h4").textContent = `Are you sure you want to delete this ${type} (${name})?`;
    checkMobileOverlay();
    deleteDialog.showModal();
  };

  //Handle deleting project
  const handleDelete = () => {
    if (deleteType === "project") app.deleteProject(currentProjectTitle);
    else {
      app.deleteTask(currentProjectTitle, currentTaskID);
    }
    updateScreen();
    closeDeleteDialog(deleteDialog);
  };

  //Handle Opening New Task Dialog
  const openNewTaskDialog = () => {
    let dialogTitle = document.getElementById("task-dialog-title");
    dialogTitle.textContent = "Adding New Task";
    checkMobileOverlay();
    editTask = false;
    taskDialog.showModal();
  };
  const openEditTaskDialog = (taskJson) => {
    console.log(taskJson);
    const dialogTitle = document.getElementById("task-dialog-title");
    const title = document.querySelector("#title");
    const dueDate = document.querySelector('input[name="task-due-date"]');
    const project = document.querySelector("select[name='project']");
    const priority = document.querySelector("select[name='priority']");

    dialogTitle.textContent = `Editing ${taskJson.title} task`;
    title.value = taskJson.title;
    dueDate.value = taskJson.dueDate;
    project.value = taskJson.project;
    priority.value = taskJson.priority;

    checkMobileOverlay();
    editTask = true;
    taskDialog.setAttribute("task-id", taskJson.id);
    taskDialog.setAttribute("current-project", taskJson.project);
    taskDialog.showModal();
  };

  const submitNewTask = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formJSON = {
      title: formData.get("title"),
      dueDate: formData.get("task-due-date"),
      project: formData.get("project"),
      priority: formData.get("priority"),
      done: false,
    };

    console.log(parseISO(formJSON.dueDate));

    if (!editTask) {
      if (app.getTask(formJSON.project, formJSON.title)) {
        console.log("Task Error");
        taskErrorMsg.style.display = "block";
        return;
      }
      console.log("Submiting New Task...");
      app.addTask(formJSON);
    } else {
      console.log("Submiting editing task");
      let taskId = taskDialog.getAttribute("task-id");
      let currentProjectName = taskDialog.getAttribute("current-project");
      const targetProjectObj = app.getProject(formJSON.project);
      const targetProjectTasks = targetProjectObj.getTasks();
      const hasDuplicate = targetProjectTasks.some((task) => task.title === formJSON.title);
      if (hasDuplicate && currentProjectName !== targetProjectObj.title) {
        console.log("Task Error");
        taskErrorMsg.style.display = "block";
        return;
      } else {
        app.editTask(currentProjectName, taskId, formJSON);
      }
    }

    closeFormDialog(newTaskForm, taskDialog);
    updateScreen();
  };

  const createTaskElement = (taskJson) => {
    const taskCard = document.createElement("div");
    const taskLeft = document.createElement("div");
    const taskRight = document.createElement("div");
    const taskBtns = document.createElement("div");
    const header = document.createElement("div");
    const titleDiv = document.createElement("div");
    const project = document.createElement("div");
    const priority = document.createElement("div");
    const createdDate = document.createElement("div");
    const dueDate = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const checkBox = document.createElement("input");
    const title = document.createElement("h3");

    taskCard.classList.add("task-card");
    taskLeft.classList.add("task-left");
    taskRight.classList.add("task-right");
    taskBtns.classList.add("task-btn");
    header.classList.add("task-header");
    titleDiv.classList.add("task-title");
    project.classList.add("task-project");
    priority.classList.add("task-priority");
    createdDate.classList.add("date-created");
    dueDate.classList.add("date-due");
    editBtn.classList.add("edit-task");
    deleteBtn.classList.add("delete-btn");

    checkBox.setAttribute("type", "checkbox");
    checkBox.checked = taskJson.done;
    checkBox.addEventListener("change", handleTaskStatusChange);
    title.innerHTML = `
      <h3 data="task">${taskJson.title}</h3>
    `;

    titleDiv.append(checkBox, title);

    project.innerHTML = `
      <h3>${taskJson.project}</h3>
    `;

    priority.innerHTML = `
      <div class="flag ${taskJson.priority.toLowerCase()}"></div>
      <span>${taskJson.priority}</span>
    
    `;

    let formattedDate = format(taskJson.createDate, "MM/dd/yyyy");
    createdDate.innerHTML = `
      <p>Date Created: ${formattedDate}</p>
    `;

    header.append(titleDiv, project);
    taskLeft.append(header, priority, createdDate);

    formattedDate = format(parseISO(taskJson.dueDate), "MM/dd/yyyy");
    dueDate.innerHTML = `
      <p>Due: ${formattedDate}</p>
    `;

    editBtn.innerHTML = `
      <img class="icon-svg" src="${editIcon}" />
    `;

    deleteBtn.innerHTML = `
      <img class="icon-svg" src="${trashIcon}" />  
    `;

    taskBtns.append(editBtn, deleteBtn);
    taskRight.append(dueDate, taskBtns);

    taskCard.append(taskLeft, taskRight);
    taskCard.setAttribute("task-id", taskJson.id);
    taskCard.setAttribute("project", taskJson.project);

    //deleteBtn.addEventListener("click", handleDeleteTask);
    deleteBtn.addEventListener("click", (e) => {
      currentProjectTitle = taskJson.project;
      currentTaskID = taskJson.id;
      currentTaskTitle = taskJson.title;
      openDeleteDialog("task", currentTaskTitle);
    });

    editBtn.addEventListener("click", () => {
      openEditTaskDialog(taskJson);
    });

    return taskCard;
  };

  const handleTaskStatusChange = (e) => {
    console.log("Status Change");
    let taskId = e.currentTarget.closest(".task-card").getAttribute("task-id");
    let projectName = e.currentTarget.closest(".task-card").getAttribute("project");
    app.editTask(projectName, taskId, { done: e.currentTarget.checked });
    updateScreen();
  };

  const applyActiveState = (newFilter) => {
    activeNavItem.classList.remove("task-active");
    activeNavItem = newFilter;
    activeNavItem.classList.add("task-active");
  };

  const handleAllTasks = () => {
    selectedNavFilter = NavFilter.ALL;
    console.log(selectedNavFilter);
    toggleShowOverlay();
    applyActiveState(allTasks);
    updateScreen();
  };

  const handleTodayTasks = () => {
    console.log(selectedNavFilter);
    selectedNavFilter = NavFilter.TODAY;
    toggleShowOverlay();
    applyActiveState(todayTasks);
    updateScreen();
  };

  const handleWeekTasks = () => {
    console.log(selectedNavFilter);
    selectedNavFilter = NavFilter.WEEK;
    toggleShowOverlay();
    applyActiveState(weekTasks);
    updateScreen();
  };

  const handleMonthasks = () => {
    console.log(selectedNavFilter);
    selectedNavFilter = NavFilter.MONTH;
    toggleShowOverlay();
    applyActiveState(monthTasks);
    updateScreen();
  };

  const handleCompletedTasks = () => {
    selectedNavFilter = NavFilter.COMPLETED;
    toggleShowOverlay();
    applyActiveState(completedTasks);
    updateScreen();
  };

  //Event Listener Declariations
  addProjectBtn.addEventListener("click", () => openProjectDialog("Adding New Project"));
  projectCancelBtn.addEventListener("click", () => closeFormDialog(newProjectForm, newProjectDialog));

  newProjectForm.addEventListener("submit", sumbitNewProject);

  //deleteBtns.forEach((btn) => btn.addEventListener("click", handleDeleteDialog));
  noBtn.addEventListener("click", () => closeDeleteDialog(deleteDialog));
  yesBtn.addEventListener("click", handleDelete);

  addNewTaskBtn.addEventListener("click", openNewTaskDialog);
  taskCancelBtn.addEventListener("click", () => closeFormDialog(newTaskForm, taskDialog));
  newTaskForm.addEventListener("submit", submitNewTask);

  allTasks.addEventListener("click", handleAllTasks);
  todayTasks.addEventListener("click", handleTodayTasks);
  weekTasks.addEventListener("click", handleWeekTasks);
  monthTasks.addEventListener("click", handleMonthasks);
  completedTasks.addEventListener("click", handleCompletedTasks);

  //initial load
  updateScreen();
}
