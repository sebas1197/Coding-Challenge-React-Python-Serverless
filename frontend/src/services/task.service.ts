import { Task, TASK_STATUS } from "../models/task.model";


export class TaskService {

    private static API_BASE: string = process.env.REACT_APP_API_BASE || 'http://localhost:8000/tasks';

    tasks: Task[] = [];

    getTasks = (): Task[] => this.tasks

    addTask = (task: Task): void => {
        this.tasks.push(task)
    }

    updateTask = (taskId: number, status: TASK_STATUS): void => {
        const task = this.tasks.find(task => task.id == taskId)
        if(task){
            task.status = status
        }
    } 

    deleteTask = (taskId: number): void => {
        this.tasks = this.tasks.filter(task => task.id !== taskId)
    }

}