import Task from "./task.js";
import Project from "./project.js";
import checkStorage from "./checkStorage.js";
import { parseISO, isToday, isWithinInterval, endOfDay, startOfWeek, startOfMonth, endOfMonth, endOfWeek } from "date-fns";

export default function taskManager() {
  console.log("Task Manager");
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
    console.log(`Adding New Project... ${projectName}`);

    let index = projects.findIndex((project) => project.title === projectName);
    if (index !== -1) return false;

    let project = new Project(projectName);
    projects.push(project);
    console.log(projects);
    updateLocalStorage();
    //Check if a project with name exist in project array
    //create new Project class if doesn't
    //add new Project class to array
    //update local storage
    //update content
  };

  const editProjectName = (currentProjectName, newProjectName) => {
    console.log(`Editing New Project... ${currentProjectName} to ${newProjectName}`);

    let index = projects.findIndex((project) => project.title === currentProjectName);
    if (index <= -1) return false;
    projects[index].title = newProjectName;
    updateLocalStorage();
    /*
    Check if a project with name exist in project array
    if exist, update project name
    update local storage
    update content
    */
  };

  const deleteProject = (projectName) => {
    console.log(`Deleting ${projectName}...`);
    let index = projects.findIndex((project) => project.title === projectName);
    if (index <= -1) return false;
    projects.splice(index, 1);
    updateLocalStorage();
    /*
    Check if a project with name exist in project array
      search array (find index)
      if found, remove from array
    */
  };

  const getProject = (projectName) => {
    console.log(`Attempting to get project ${projectName}...`);

    let index = projects.findIndex((project) => project.title === projectName);

    if (index <= -1) return false;
    return projects[index];
    /*
    Check if a project with name exist in project array
    if exist, return project
    else display error
    */
  };

  const getAllProjects = () => {
    return projects;
  };

  const addTask = (formJSON) => {
    console.log(`Adding Task...`);

    let projectIndex = projects.findIndex((p) => p.title === formJSON.project);
    if (projectIndex <= -1) return false;

    let task = new Task(formJSON);
    console.log(task);

    projects[projectIndex].addTask(task);
    updateLocalStorage();
    console.log(projects);

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
  const getTask = (projectName, title) => {
    console.log(projectName);
    console.log(title);
    let projectIndex = projects.findIndex((project) => project.title === projectName);
    if (projectIndex <= -1) return;

    let tasksArr = projects[projectIndex].getTasks();
    let taskIndex = tasksArr.findIndex((task) => task.title === title);
    if (taskIndex !== -1) return tasksArr[taskIndex];

    /*
    Check if task and project exist and if task exist in project
    If exist, find task
      find project task belong to
      find task in project's tasks array
      return task
    */
  };

  const getAllTasks = () => {
    let allTasks = [];
    projects.forEach((project) => {
      let projectTaskArr = project.getTasks();
      projectTaskArr.forEach((task) => {
        allTasks.push(task);
      });
    });

    return allTasks;
    /*
    Since tasks are contain in project's tasks array, projects array. 
    Create an array, tasks, to hold all the tasks.
    For each projects, loop through their tasks array and add it into the 
    tasks array. 
    Return the tasks array that hold all the tasks
    */
  };

  const getTodayTasks = () => {
    let allTasks = getAllTasks();
    console.log(allTasks);

    let todayTasks = allTasks.filter((task) => isToday(parseISO(task.dueDate)));
    console.log(todayTasks);
    return todayTasks;
    /*
    Simlar to getting all the tasks
    filter by due date using isToday function from date-fns
    */
  };

  //Grab tasks within the week (Monday - Sunday)
  const getWeekTasks = () => {
    let allTasks = getAllTasks();
    let monday = startOfWeek(new Date(), { weekStartsOn: 1 });
    let sunday = endOfDay(endOfWeek(new Date(), { weekStartsOn: 1 }));
    let weekTasks = allTasks.filter((task) => isWithinInterval(parseISO(task.dueDate), { start: monday, end: sunday }));

    return weekTasks;
    /*
      Grab all tasks
      Create variable for Monday using startOfWeek function
      Create variable for Sunday using endOfDay, endOfWeek function
      Filter through all task and see if the duedate is within the two variable
        using isWithinInterval function
      return tasks
    */
  };

  //Grab task within the month (First day - last day)
  const getMonthTasks = () => {
    let allTasks = getAllTasks();
    let firstDay = startOfMonth(new Date());
    let lastDay = endOfMonth(new Date());
    let monthTasks = allTasks.filter((task) => isWithinInterval(parseISO(task.dueDate), { start: firstDay, end: lastDay }));
    return monthTasks;
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
    let allTasks = getAllTasks();
    let completedTasks = allTasks.filter((task) => task.done === true);
    return completedTasks;
    /*
      Grab all tasks
      Filter through all tasks and return tasks that has done attributes as true.
    */
  };

  const updateLocalStorage = () => {
    let projectsName = projects.map((project) => project.title) || [];
    let tasks = getAllTasks() || [];

    localStorage.setItem("projectNames", JSON.stringify(projectsName));
    localStorage.setItem("tasks", JSON.stringify(tasks));
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
  };
}
