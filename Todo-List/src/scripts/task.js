export default class Task {
  constructor({ title, dueDate, project, priority, done } = {}) {
    this.title = title;
    this.dueDate = dueDate;
    this.project = project;
    this.priority = priority;
    this.done = done || false;
    this.createDate = new Date();
  }

  editTask(taskJson) {
    for (const key in taskJson) {
      if (taskJson.hasOwnProperty(key) && key in this) {
        this[key] = taskJson[key];
      }
    }
  }
}
