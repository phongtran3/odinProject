
export default class Project {
    #tasks = [];
    #taskID = 1;

    constructor(title) {
        this.title = title;
    }

    editProjectTitle(taskID, newTitle) {
        if(!taskID && taskID !== 0) return;

        let index = this.#tasks.findIndex(task => task.id === taskID);

        if(index >= 0) {
            this.#tasks[index] = {...this.#tasks[index], title: newTitle};
        }

    }

    addTask(task) {
        if(!task) return
        const taskWithID = { ...task, id: this.#taskID++ };

        this.#tasks.push(taskWithID)
    }

    deleteTask(taskID) {
        if(!taskID && taskID !== 0) return;

        this.#tasks = this.#tasks.filter(task => task.id !== taskID); //Remove the task from the array

        //Shift ID down
        this.#tasks = this.#tasks.map(task => {
            if(task.id > taskID){
                task = {...task, id: task.id - 1};
            }

            return task;
        });

        this.#taskID--;
    }

    getTask(taskID) {
        if(!taskID && taskID !== 0) return;

        let index = this.#tasks.findIndex(task => task.id === taskID);

        if(index < 0) return null;

        return this.#tasks[index];
    }

    getTasks() {
        return this.#tasks;
    }

}
