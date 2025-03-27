import React, { useState } from "react";
import { TaskService } from "../services/task.service";
import { Task, TASK_STATUS } from "../models/task.model";

import {
    Container,
    Box,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import TaskCard from "../components/taskCard.component";
import TaskForm from "../components/taskForm.component";
import NavBar from "../components/menu.component";

const taskService = new TaskService();

const Home: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(taskService.getTasks());
    const [open, setOpen] = useState(false);

    const refreshTasks = () => {
        setTasks([...taskService.getTasks()]);
    };

    const addTask = (task: Task) => {
        taskService.addTask(task);
        refreshTasks();
        handleClose();
    };

    const updateTaskStatus = (taskId: number, status: TASK_STATUS) => {
        taskService.updateTask(taskId, status);
        refreshTasks();
    };

    const deleteTask = (taskId: number) => {
        taskService.deleteTask(taskId);
        refreshTasks();
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <NavBar />
            <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", py: 4 }}>
                <Container maxWidth="md">
                    <Typography variant="h3" align="center" gutterBottom>
                        Task Manager
                    </Typography>
                    <Box textAlign="center" mb={3}>
                        <Button variant="contained" color="primary" onClick={handleOpen}>
                            Add Task
                        </Button>
                    </Box>

                    <Grid container spacing={2}>
                        {tasks.map((task) => (
                            <Grid item xs={12} sm={6} key={task.id}>
                                <TaskCard
                                    task={task}
                                    onDelete={deleteTask}
                                    onUpdateStatus={updateTaskStatus}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add New Task</DialogTitle>
                        <DialogContent>
                            <TaskForm onAdd={addTask} />
                        </DialogContent>
                    </Dialog>
                </Container>
            </Box>
        </>
    );
};

export default Home;
