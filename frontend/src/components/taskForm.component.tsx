import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Task, TASK_STATUS } from "../models/task.model";

interface TaskFormProps {
  onAdd: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (title.trim() === "") return;
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status: TASK_STATUS.TO_DO,
    };
    onAdd(newTask);
    setTitle("");
    setDescription("");
  };

  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        // Make this responsive: take full width but limit max width
        width: "100%",
        maxWidth: 400,
      }}
    >
      <TextField
        label="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          padding: "10px 20px",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#1565c0" },
        }}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default TaskForm;
