import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import TaskChart from './pages/TaskChart'
import { Task, TASK_STATUS } from './models/task.model'

function App() {

  const tasksMock: Task[] = [
    {
      id: Math.random(),
      title: "title 1",
      description: "desc 1",
      status: TASK_STATUS.TO_DO
    },
    {
      id: Math.random(),
      title: "title 2",
      description: "desc 2",
      status: TASK_STATUS.IN_PROGRESS
    },
    {
      id: Math.random(),
      title: "title 3",
      description: "desc 3",
      status: TASK_STATUS.TO_DO
    },
    {
      id: Math.random(),
      title: "title 4",
      description: "desc 4",
      status: TASK_STATUS.COMPLETED
    },
    {
      id: Math.random(),
      title: "title 5",
      description: "desc 5",
      status: TASK_STATUS.IN_PROGRESS
    },
    {
      id: Math.random(),
      title: "title 6",
      description: "desc 6",
      status: TASK_STATUS.IN_PROGRESS
    },
    {
      id: Math.random(),
      title: "title 7",
      description: "desc ",
      status: TASK_STATUS.COMPLETED
    }
  ]

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/chart" element={<TaskChart tasks={tasksMock} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
