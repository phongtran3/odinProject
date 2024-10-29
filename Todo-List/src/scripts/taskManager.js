import Task from "./task.js";
import Project from "./project.js";
import checkStorage from "./checkStorage.js";
import { isToday, addWeeks, isWithinInterval, startOfDay, endOfDay } from "date-fns";

export default function taskManager() {
  console.log("Task Manager");
  const projects = [];

  const initialLoad = () => {
    if (checkStorage("localStorage")) {
      let projects = localStorage.getItem("projectName");
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
    //Check if a project with name exist in project array
    //if exist display error to user
    //else create new Project class
    //add new Project class to array
    //update local storage
    //return project and update content
  };

  const editProjectName = (projectName) => {
    /*
    Check if a project with name exist in project array
    if exist, update project name
    update local storage
    update content
    */
  };

  const deleteProject = (projectName) => {
    /*
    Check if a project with name exist in project array
      search array (find index)
      if found, remove from array
    */
  };

  const getProject = (projectName) => {
    /*
    Check if a project with name exist in project array
    if exist, return project
    else display error
    */
  };

  const getAllProjects = () => {
    return projects;
  };

  const addTask = (taskJson) => {
    /*
    -title, dueDate, project, priority, done-
    Check if taskJson isn't null
    Check if project from taskJson exist
    if exist, add task to the project task's array
    update local storage
    update content
    */
  };

  const editTask = (projectName, taskID, updatedJson) => {
    /*
    Check if updatedJson isn't null
    Get current task
    Check if current project exist
    If project exist, check if the project is the same as updated project
      if same, update current project with updatedJson
      else, 
        current project needs to remove current task
        new project needs to add updated project
    update local storage
    update content
    */
  };

  const deleteTask = (projectName, taskID) => {};
  const getTask = (projectName, taskID) => {};
  const getAllTasks = () => {};
  const getTodayTasks = () => {};
  const getWeekTasks = () => {};
  const getMonthTasks = () => {};
  const getCompletedTasks = () => {};

  return {
    initialLoad,
  };
}
