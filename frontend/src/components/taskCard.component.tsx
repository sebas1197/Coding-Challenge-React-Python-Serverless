import React from 'react';
import { Task, TASK_STATUS } from '../models/task.model';
import { Card, CardContent, Typography, Button } from '@mui/material';

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onUpdateStatus: (id: number, status: TASK_STATUS) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onUpdateStatus }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2">{task.description}</Typography>
        <Typography variant="body1">{task.status}</Typography>
        <Button onClick={() => onUpdateStatus(task.id, TASK_STATUS.IN_PROGRESS)}>Start</Button>
        <Button onClick={() => onUpdateStatus(task.id, TASK_STATUS.COMPLETED)}>Complete</Button>
        <Button onClick={() => onDelete(task.id)}>Delete</Button>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
