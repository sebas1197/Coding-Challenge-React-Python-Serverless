import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Task, TASK_STATUS } from '../models/task.model';

interface TaskFormProps {
  onAdd: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    const newTask: Task = {
      id: Date.now(), // Unique ID (you could use UUID)
      title,
      description,
      status: TASK_STATUS.TO_DO,
    };
    onAdd(newTask);
  };

  return (
    <div>
      <TextField 
        label="Task Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <TextField 
        label="Task Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <Button onClick={handleSubmit}>Add Task</Button>
    </div>
  );
};

export default TaskForm;
