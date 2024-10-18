//Get project to push task to

const fomartDate = (date) => {
    //const date = new Date(); // Get the current date
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with leading 0 if necessary
    const year = date.getFullYear(); // Get the full year

    return `${month}/${day}/${year}`;
}



export class Task {

    constructor(taskJson) {
        this.title = taskJson.title;
        this.dueDate = fomartDate(new Date(taskJson.dueDate));
        this.project = taskJson.project;
        this.priority = taskJson.priority;
        this.done = taskJson.done;
        this.createDate = fomartDate(new Date());
    }


    editTask(taskJson) {

    }

}