import axios, { AxiosResponse } from "axios";
import { Task } from "../models/task.model";


export class TaskService {

    private API_BASE: string = 'http://127.0.0.1:8000';

    public async listTasks(): Promise<Task[]> {
        try {
            const response: AxiosResponse<Task[]> = await axios.get(`${this.API_BASE}/list/`);
            if (response.status === 200) {
                return response.data;
            }
            throw new Error(`Unexpected HTTP status: ${response.status}`);
        } catch (error) {
            throw error;
        }
    }

    public async createTask(task: Task): Promise<string> {
        try {
            const response: AxiosResponse<{ message: string }> = await axios.post(`${this.API_BASE}/create/`, task);
            if (response.status === 201) {
                return response.data.message;
            }
            throw new Error(`Unexpected HTTP status: ${response.status}`);
        } catch (error) {
            throw error;
        }
    }


    async updateTask(updatedTask: Task): Promise<string> {
        const response: AxiosResponse<{ message: string }> = await axios.put(`${this.API_BASE}/update/`, updatedTask);
        if (response.status === 200) {
            return response.data.message;
        }
        throw new Error(`Unexpected HTTP status: ${response.status}`);
    }

    public async deleteTask(taskId: number): Promise<string> {
        try {
            const response: AxiosResponse<{ message: string }> = await axios.delete(`${this.API_BASE}/delete/`, { data: { _id: taskId } });
            if (response.status === 200) {
                return response.data.message;
            }
            throw new Error(`Unexpected HTTP status: ${response.status}`);
        } catch (error) {
            throw error;
        }
    }

}