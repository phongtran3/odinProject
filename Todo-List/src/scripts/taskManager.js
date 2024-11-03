import Task from "./task.js";
import Project from "./project.js";
import checkStorage from "./checkStorage.js";
import { isToday, addWeeks, isWithinInterval, startOfDay, endOfDay, startOfWeek, addDays, startOfMonth, endOfMonth } from "date-fns";

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
    console.log(`Adding New Project... ${projectName}`);
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

  const deleteTask = (projectName, taskID) => {
    /*
    Check if task and project exist and if task exist in project
    if exist, find task in project tasks array and remove it
    update local storage
    update content
    */
  };

  //Get current task for when user edit a task
  //This is to populate the form fields
  const getTask = (projectName, taskID) => {
    /*
    Check if task and project exist and if task exist in project
    If exist, find task
      find project task belong to
      find task in project's tasks array
      return task
    */
  };

  const getAllTasks = () => {
    /*
    Since tasks are contain in project's tasks array, projects array. 
    Create an array, tasks, to hold all the tasks.
    For each projects, loop through their tasks array and add it into the 
    tasks array. 
    Return the tasks array that hold all the tasks
    */
  };

  const getTodayTasks = () => {
    /*
    Simlar to getting all the tasks
    filter by due date using isToday function from date-fns
    */
  };

  //Grab tasks within the week (Monday - Sunday)
  const getWeekTasks = () => {
    /*
      Grab all tasks
      Create variable for Monday using startOfWeek function
      Create variable for Sunday using addDays function
      Filter through all task and see if the duedate is within the two variable
        using isWithinInterval function
      return tasks
    */
  };

  //Grab task within the month (First day - last day)
  const getMonthTasks = () => {
    /*
      Grab all tasks
      Create variable for firstDay using startOfMonth function
      Create variable for lastDay using endOfMonth function
      Filter through all task and see if due date is within the two variables
        using isWithinInterval function
      return tasks
    */
  };

  //Grab all completed task
  const getCompletedTasks = () => {
    /*
      Grab all tasks
      Filter through all tasks and return tasks that has done attributes as true.
    */
  };

  const updateLocalStorage = () => {
    /*
      Grab all tasks
      Grab all projects name
      Set tasks in local storage (tasks, json.stringify(tasks))
      Set project name in local storage (projectName, json.stringify(projectnames)
    */
  };

  return {
    initialLoad,
    addProject,
  };
}
