
export class Project {
    #tasks = [];
    #taskID = 1;

    constructor(title) {
        this.title = title;
    }


    addTask(task) {
        if(!task) return
        const taskWithID = { ...task, id: this.#taskID++ };

        this.#tasks.push(taskWithID)
    }

    deleteTask(taskID) {
        if(!taskID) return;

        this.#tasks = this.#tasks.filter(id => id !== taskID); //Remove the task from the array

        //Shift ID down
        this.#tasks = this.#tasks.map(task => {
            if(task.id > taskID){
                task = {...task, id: taskID - 1};
            }
            
            return task;
        });

        this.#taskID--;
    }

    getTasks() {
        return this.#tasks;
    }

}
