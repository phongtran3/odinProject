import Task from "./task.js";
import Project from "./project.js"
import checkStorage from "./checkStorage.js";
import { isToday, addWeeks, isWithinInterval, startOfDay, endOfDay } from "date-fns";



export default function taskManager() {
    console.log("Task Manager");
    const projects = [];

    const initialLoad = () => {
        if(checkStorage("localStorage")){
            let projects = localStorage.getItem("projectName");
            let tasks = localStorage.getItem("tasks");

            if(tasks && projects){
                projects = JSON.parse(projects);
                projects.forEach(project => addProject(project));
                tasks = JSON.parse(tasks);
                tasks.forEach(task => addTask(task));
                return;
            }

        }
    }
    

    const addProject = (projectName) => {}
    const editProjectName = (projectName) => {}
    const deleteProject = (projectName) => {}
    const getProject = (projectName) => {}
    const getAllProjects = () => {return projects}

    const addTask = (taskJson) => {}
    const editTask = (projectName, taskID, updatedJson) => {}
    const deleteTask = (projectName, taskID) => {}
    const getTask = (projectName, taskID) => {}
    const getAllTasks = () => {}
    const getTodayTasks = () => {}
    const getWeekTasks = () => {}
    const getMonthTasks = () => {}
    const getCompletedTasks = () => {}



}