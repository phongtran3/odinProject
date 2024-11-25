import Task from "./task.js";
import Project from "./project.js";
import checkStorage from "./checkStorage.js";
import { parseISO, isToday, isWithinInterval, endOfDay, startOfWeek, startOfMonth, endOfMonth, endOfWeek } from "date-fns";

export default function taskManager() {
  const projects = [];

  const initialLoad = () => {
    //Prevent user selecting past dates
    const dueDateInput = document.querySelector('input[name="task-due-date"]');
    const today = new Date().toISOString().split("T")[0];
    dueDateInput.setAttribute("min", today);

    if (checkStorage("localStorage")) {
      let projects = localStorage.getItem("projectNames");
      let tasks = localStorage.getItem("tasks");

      if (tasks && projects) {
        projects = JSON.parse(projects);
        projects.forEach((project) => addProject(project));
        tasks = JSON.parse(tasks);
        tasks.forEach((task) => addTask(task));
        return;
      }
    }
  };

  const addProject = (projectName) => {
    /*
    Check if a project with name exist in project array
    Create new Project class Object if doesn't exisit
    Push new Project class into projects array
    update local storage
    */

    let index = projects.findIndex((project) => project.title === projectName);
    if (index !== -1) return false;

    let project = new Project(projectName);
    projects.push(project);
    updateLocalStorage();
  };

  const editProjectName = (currentProjectName, newProjectName) => {
    /*
    Check if a project with name exist in project array
    If exist, update Project's name
    Update each task in Project's task array to updated title 
    Update local storage
    */

    let index = projects.findIndex((project) => project.title === currentProjectName);
    if (index <= -1) return false;
    projects[index].title = newProjectName;

    let taskArr = projects[index].getTasks();
    taskArr.forEach((task) => task.project = newProjectName);

    updateLocalStorage();
  };

  const deleteProject = (projectName) => {
    /*
    Check if a project with name exist in project array
    If found, remove it from the projects array
    Update local storage
    */
    let index = projects.findIndex((project) => project.title === projectName);
    if (index <= -1) return false;
    projects.splice(index, 1);
    updateLocalStorage();
  };

  const getProject = (projectName) => {
    /*
    Check if a project with name exist in project array
    If exist, return project
    Else, display error on screenManager
    */
    let index = projects.findIndex((project) => project.title === projectName);

    if (index <= -1) return false;
    return projects[index];
  };

  const getAllProjects = () => {
    return projects;
  };

  const addTask = (formJSON) => { 
    /*
    -title, dueDate, project, priority, done-
    Check if project from taskJson exist
    If exist, add task to the project task's array
    Update local storage
    */
    let projectIndex = projects.findIndex((p) => p.title === formJSON.project);
    if (projectIndex <= -1) return false;

    let task = new Task(formJSON);
    projects[projectIndex].addTask(task);
    updateLocalStorage();
  };

  const editTask = (projectName, taskID, updatedJson) => {
    /*
    Get current Project Obj
    Get current Task Obj
    Check if there's a new project
      If there's a new project, get the new targeted Project Obj
      Check if the new targeted Project Obj exist
      If exist, delete current task from current project
        Edit the current Task
        Added edited current Task to new targeted Project Obj
      Else
        Edit the current Task
    Update local storage
    */

    let currentProject = getProject(projectName);
    let currentTask = currentProject.getTask(taskID);

    if (!currentTask) return;

    let newProject = updatedJson.project;
    if (newProject && newProject !== currentTask.project) {
      const targetProjectObj = getProject(newProject);
      if (!targetProjectObj || !currentProject) return;

      currentProject.deleteTask(taskID);
      currentTask.editTask(updatedJson);
      targetProjectObj.addTask(currentTask);
    } else {
      currentTask.editTask(updatedJson);
    }

    updateLocalStorage();
  };

  const deleteTask = (projectName, taskID) => {
    /*
     Check if a project with name exist in project array
      If exist, find task in projects array and remove it
    update local storage
    */

    let projectIndex = projects.findIndex((p) => p.title === projectName);
    if (projectIndex <= -1) return false;

    projects[projectIndex].deleteTask(taskID);
    updateLocalStorage();
  };

  //Get current task for when user edit a task
  //This is to populate the form fields
  const getTask = (projectName, title) => {
    /*
    Check if a project with name exist in project array
      Grab index if exist
    Check if task exist within the project's task array
      Grab index if exist
    If task exist within project's task array, return task at that index
    */

    let projectIndex = projects.findIndex((project) => project.title === projectName);
    if (projectIndex <= -1) return;

    let tasksArr = projects[projectIndex].getTasks();
    let taskIndex = tasksArr.findIndex((task) => task.title === title);
    if (taskIndex !== -1) return tasksArr[taskIndex];
  };

  const getAllTasks = () => {
    /*
    Since tasks are contain in project's tasks array,
    Create an array, to hold all the tasks, allTasks.
    For each projects, loop through their tasks array and add it into the allTasks array. 
    Return the tasks array that hold all the tasks
    */

    let allTasks = [];
    projects.forEach((project) => {
      let projectTaskArr = project.getTasks();
      projectTaskArr.forEach((task) => {
        allTasks.push(task);
      });
    });

    return allTasks;
  };

  const getTodayTasks = () => {
    /*
    Get all the tasks from getAllTasks function
    Filter allTasks array by due date using isToday function from date-fns
    */

    let allTasks = getAllTasks();
    let todayTasks = allTasks.filter((task) => isToday(parseISO(task.dueDate)));
    return todayTasks;
  };

  //Grab tasks within the week (Monday - Sunday)
  const getWeekTasks = () => {
    /*
      Get all the tasks from getAllTasks function
      Create variable for Monday using startOfWeek function
      Create variable for Sunday using endOfDay/endOfWeek function
      Filter through all task and see if the duedate is within the two variable using isWithinInterval function
      return filtered tasks
    */

    let allTasks = getAllTasks();
    let monday = startOfWeek(new Date(), { weekStartsOn: 1 });
    let sunday = endOfDay(endOfWeek(new Date(), { weekStartsOn: 1 }));
    let weekTasks = allTasks.filter((task) => isWithinInterval(parseISO(task.dueDate), { start: monday, end: sunday }));
    return weekTasks;
  };

  //Grab task within the month (First day - last day)
  const getMonthTasks = () => {
    /*
      Get all the tasks from getAllTasks function
      Create variable for firstDay using startOfMonth function
      Create variable for lastDay using endOfMonth function
      Filter through all task and see if due date is within the two variables using isWithinInterval function
      return tasks
    */
    let allTasks = getAllTasks();
    let firstDay = startOfMonth(new Date());
    let lastDay = endOfMonth(new Date());
    let monthTasks = allTasks.filter((task) => isWithinInterval(parseISO(task.dueDate), { start: firstDay, end: lastDay }));
    return monthTasks;
  };

  //Grab all completed task
  const getCompletedTasks = () => {
    /*
      Get all the tasks from getAllTasks function
      Filter through all tasks and return tasks that has done attributes as true.
    */
    let allTasks = getAllTasks();
    let completedTasks = allTasks.filter((task) => task.done === true);
    return completedTasks;

  };

  const updateLocalStorage = () => {
    /*
      Grab all tasks
      Grab all projects name
      Set tasks in local storage (tasks, json.stringify(tasks))
      Set project name in local storage (projectName, json.stringify(projectnames)
    */
    let projectsName = projects.map((project) => project.title) || [];
    let tasks = getAllTasks() || [];

    localStorage.setItem("projectNames", JSON.stringify(projectsName));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
  };

  return {
    initialLoad,
    addProject,
    getProject,
    getAllProjects,
    editProjectName,
    deleteProject,
    addTask,
    getTask,
    getAllTasks,
    getTodayTasks,
    getWeekTasks,
    getMonthTasks,
    getCompletedTasks,
    editTask,
    deleteTask,
  };
}
