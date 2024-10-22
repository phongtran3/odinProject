export class Task {

    constructor({ title, dueDate, project, priority, done } = {}) {
        this.title = title;
        this.dueDate = dueDate
        this.project = project;
        this.priority = priority;
        this.done = done || false;
        this.createDate = new Date();
    }


    editTask({ title, dueDate, project, priority, done } = {}) {
        if(title !== undefined) this.title = title;
        if(dueDate !== undefined) this.dueDate = dueDate
        if(project !== undefined) this.project = project;
        if(priority !== undefined) this.priority = priority;
        if(done !== undefined) this.done = done;
    }

}