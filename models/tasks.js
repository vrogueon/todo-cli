const Task = require("./task");

/**
 * _list:
 * {'uuid-12312412-124134-2': {id:123, desc:ad. completedAt:412312}}
 */

class Tasks {
    _list = {};

    get tasksList() {
        const list = [];

        Object.keys(this._list).forEach(key => {
            list.push(this._list[key]);
        });

        return list;
    }

    constructor() {
        this._list = {};
    }

    createTask(desc = '') {
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    loadTasksFromArray(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task;
        })
    }

    fullList() {
        console.log();
        this.tasksList.forEach((task, i) => {
            const index = `${i + 1}`.green;
            const {desc, completedAt} = task;
            const status = completedAt ? 'Completada'.green : 'Pendiente'.red;
            
            console.log(`${index} ${desc} :: ${status}`);
        });
    }

    listTasksByStatus(completed = true) {
        console.log();
        let index = 0;
        this.tasksList.forEach((task) => {
            
            const {desc, completedAt} = task;
            const status = completedAt ? 'Completada'.green : 'Pendiente'.red;
            if(completed) {
                if(completedAt) {
                    index += 1;
                    console.log(`${(index + '.').green} ${desc} :: ${completedAt.green}`);
                }
            } else {
                if(!completedAt) {
                    index += 1;
                    console.log(`${(index + '.').green} ${desc} :: ${status}`);
                }
            }
            
            
        });
    }

    deleteTask(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    updateTask(ids = []) {
        ids.forEach(id => {
            const task = this._list[id];
            if(!task.completedAt) {
                task.completedAt = new Date().toISOString();
            }
        });

        this.tasksList.forEach(task => {
            if(!ids.includes(task.id)) {
                this._list[task.id].completedAt = null;
            }
        });
    }
}

module.exports = Tasks;