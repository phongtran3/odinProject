//Get project to push task to

const formatDate = (date) => {
    //const date = new Date(); // Get the current date
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with leading 0 if necessary
    const year = date.getFullYear(); // Get the full year

    return `${month}/${day}/${year}`;
}

export class Task {

    constructor({ title, dueDate, project, priority, done } = {}) {
        this.title = title;
        this.dueDate = formatDate(new Date(dueDate));
        this.project = project;
        this.priority = priority;
        this.done = done || false;
        this.createDate = formatDate(new Date());
    }


    editTask({ title, dueDate, project, priority, done } = {}) {
        if(title !== undefined) this.title = title;
        if(dueDate !== undefined) this.dueDate = formatDate(new Date(dueDate));
        if(project !== undefined) this.project = project;
        if(priority !== undefined) this.priority = priority;
        if(done !== undefined) this.done = done;
    }

}