export default class Project {
  #tasks = [];
  #taskID = 1;

  constructor(title) {
    this.title = title;
  }

  addTask(task) {
    if (!task) return;
    task.id = this.#taskID++;

    console.log(task);
    this.#tasks.push(task);
  }

  deleteTask(taskID) {
    if (!taskID && taskID !== 0) return;

    this.#tasks = this.#tasks.filter((task) => task.id !== taskID); //Remove the task from the array

    //Shift ID down
    this.#tasks = this.#tasks.map((task) => {
      if (task.id > taskID) {
        task = { ...task, id: task.id - 1 };
      }

      return task;
    });

    this.#taskID--;
  }

  getTask(taskID) {
    if (!taskID && taskID !== 0) return;

    let index = this.#tasks.findIndex((task) => task.id === Number(taskID));

    if (index < 0) return null;

    return this.#tasks[index];
  }

  getTasks() {
    return this.#tasks;
  }
}
