//Get project to push task to

const fomartDate = () => {
    const date = new Date(); // Get the current date
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with leading 0 if necessary
    const year = date.getFullYear(); // Get the full year

    return `${month}/${day}/${year}`;
}



export class Task {

    constructor(title, dueDate, project, priority ) {
        this.title = title;
        this.dueDate = dueDate;
        this.project = project;
        this.priority = priority;
        this.createDate = fomartDate();
    }


}