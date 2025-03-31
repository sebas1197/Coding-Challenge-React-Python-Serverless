import React from "react";
import { Task } from "../models/task.model";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onUpdate: (updatedTask: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDelete,
  onUpdate,
}) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id);
    }
  };

  return (
    <Card sx={{ padding: 2, marginBottom: 2 }}>
      <CardContent sx={{ textAlign: "left" }}>
        <Typography variant="body1">
          <strong>Title:</strong> {task.title}
        </Typography>
        <Typography variant="body1">
          <strong>Description:</strong> {task.description}
        </Typography>
        <Typography variant="body1">
          <strong>Status:</strong> {task.status}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
            onClick={() => onUpdate(task)}
          >
            To Do
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFA500",
              color: "white",
              "&:hover": { backgroundColor: "#FF8C00" },
            }}
            onClick={() => onUpdate(task)}
          >
            In Progress
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#388E3C",
              color: "white",
              "&:hover": { backgroundColor: "#2E7D32" },
            }}
            onClick={() => onUpdate(task)}
          >
            Complete
          </Button>
          <IconButton
            aria-label="delete"
            onClick={handleDelete}
            sx={{ color: "#d32f2f" }}
          >
            X
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
