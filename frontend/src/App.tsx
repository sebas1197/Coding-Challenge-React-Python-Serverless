import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TaskChart from './pages/TaskChart';
import LoginPage from './pages/Login';
import PrivateRoute from './components/privateRoute.component';
import { Task, TASK_STATUS } from './models/task.model';

const tasksMock: Task[] = [
  { id: Math.random(), title: "title 1", description: "desc 1", status: TASK_STATUS.TO_DO },
  { id: Math.random(), title: "title 2", description: "desc 2", status: TASK_STATUS.IN_PROGRESS },
  { id: Math.random(), title: "title 3", description: "desc 3", status: TASK_STATUS.TO_DO },
  { id: Math.random(), title: "title 4", description: "desc 4", status: TASK_STATUS.COMPLETED },
  { id: Math.random(), title: "title 5", description: "desc 5", status: TASK_STATUS.IN_PROGRESS },
  { id: Math.random(), title: "title 6", description: "desc 6", status: TASK_STATUS.IN_PROGRESS },
  { id: Math.random(), title: "title 7", description: "desc ", status: TASK_STATUS.COMPLETED }
];

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/chart" element={<PrivateRoute><TaskChart tasks={tasksMock} /></PrivateRoute>} />

        {/* Fallback: if route not matched, redirect to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

// ✅ Ensure default export
export default App;
