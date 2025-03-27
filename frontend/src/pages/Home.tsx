import React, { useState } from "react";
import { TaskService } from "../services/task.service";
import { Task, TASK_STATUS } from "../models/task.model";
import TaskForm from "../components/taskForm.component";
import TaskCard from "../components/taskCard.component";

const taskService = new TaskService(); // Create an instance of TaskService

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(taskService.getTasks()); // Initial state

  const refreshTasks = () => {
    setTasks([...taskService.getTasks()]); // Update state from service
  };

  const addTask = (task: Task) => {
    taskService.addTask(task);
    refreshTasks();
  };

  const updateTaskStatus = (taskId: number, status: TASK_STATUS) => {
    taskService.updateTask(taskId, status);
    refreshTasks();
  };

  const deleteTask = (taskId: number) => {
    taskService.deleteTask(taskId);
    refreshTasks();
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm onAdd={addTask} />
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={deleteTask}
          onUpdateStatus={updateTaskStatus}
        />
      ))}
    </div>
  );
};

export default Home;
