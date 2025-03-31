import React, { useEffect, useState } from "react";
import { TaskService } from "../services/task.service";
import { Task } from "../models/task.model";

import {
    Container,
    Box,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
} from "@mui/material";

import TaskCard from "../components/taskCard.component";
import TaskForm from "../components/taskForm.component";
import NavBar from "../components/menu.component";

const taskService = new TaskService();

const Home: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await taskService.listTasks();
                setTasks(data);
            } catch (err) {
                console.error('Failed to fetch tasks:', err);
            }
        };

        fetchTasks();
    }, []);

    const refreshTasks = async () => {
        setTasks([... await taskService.listTasks()]);
    };

    const addTask = (task: Task) => {
        taskService.createTask(task);
        refreshTasks();
        handleClose();
    };

    const updateTask = async (updatedTask: Task) => {
        try {
            await taskService.updateTask(updatedTask);
            refreshTasks();
        } catch (err) {
            console.error("Failed to update task:", err);
        }
    };

    const deleteTask = (taskId: number) => {
        taskService.deleteTask(taskId);
        refreshTasks();
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <NavBar />
            <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", py: 4 }}>
                {/* Container with maxWidth="md" is generally good for desktop/tablet,
            but it will also be responsive on mobile. */}
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
                                    onUpdate={updateTask}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Make the dialog fullWidth and constrain its maxWidth for better mobile responsiveness */}
                    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
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
