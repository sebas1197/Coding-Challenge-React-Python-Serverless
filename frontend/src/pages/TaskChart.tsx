import { Card, CardHeader, CardContent, Typography, Box } from "@mui/material";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { COLORS, TaskChartPageProps } from "../models/graphics.model";
import { TASK_STATUS } from "../models/task.model";
import NavBar from "../components/menu.component";

const TaskChart: React.FC<TaskChartPageProps> = ({ tasks }) => {
    const todoCount = tasks.filter((task) => task.status === TASK_STATUS.TO_DO).length;
    const inProgressCount = tasks.filter((task) => task.status === TASK_STATUS.IN_PROGRESS).length;
    const completedCount = tasks.filter((task) => task.status === TASK_STATUS.COMPLETED).length;

    const data = [
        { name: TASK_STATUS.TO_DO, value: todoCount },
        { name: TASK_STATUS.IN_PROGRESS, value: inProgressCount },
        { name: TASK_STATUS.COMPLETED, value: completedCount },
    ];

    return (
        <Card sx={{ maxWidth: 600, margin: '0 auto', mt: 4 }}>
            <NavBar />
            <CardHeader title="Task Distribution" />
            <CardContent>
                <Typography variant="body1" gutterBottom>
                    A quick overview of the number of tasks in each status:
                </Typography>

                <Box sx={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
}

export default TaskChart