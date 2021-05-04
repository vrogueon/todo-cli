require('colors');

const { 
    inquirerMenu, 
    pause, 
    readInput, 
    listTasksToDelete,
    listTasksToComplete,
    confirm
} = require('./helpers/inquirer');
const { save, read } = require('./helpers/fileHelper');
const Tasks = require('./models/tasks');


console.clear();

const main = async() => {
    let opt = '';
    const tasks = new Tasks();
    const tasksFile = read();

    if(tasksFile) {
        tasks.loadTasksFromArray(tasksFile);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await readInput('Descripcion: ');
                tasks.createTask(desc);
            break;
            case '2':
                tasks.fullList();
            break;
            case '3':
                tasks.listTasksByStatus();
            break;
            case '4':
                tasks.listTasksByStatus(false);
            break;
            case '5':
                const ids = await listTasksToComplete(tasks.tasksList);
                tasks.updateTask(ids);
            break;
            case '6':
                const id = await listTasksToDelete(tasks.tasksList);
                if (id !== '0') {
                    const confirmation = await confirm('¿Está seguro?');
                    if(confirmation) {
                        tasks.deleteTask(id);
                    }
                }
            break;
            case '0':
            break;
        }

        save(tasks.tasksList);

        await pause();
    } while (opt !== '0');
    
}

main();