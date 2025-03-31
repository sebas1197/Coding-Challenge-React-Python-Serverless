import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { TaskService } from "./task.service";
import { Task } from "../models/task.model";

// Crear una instancia del mock de axios
const mock = new MockAdapter(axios);

describe("TaskService", () => {
  let service: TaskService;

  beforeEach(() => {
    service = new TaskService();
  });

  afterEach(() => {
    mock.reset(); // Limpiar mocks después de cada prueba
  });

  test("should return tasks when listTasks is called", async () => {
    const mockTasks: Task[] = [{ _id: 1, title: "Task 1", description: "Description 1" }];
    
    // Configurar el mock para responder a la solicitud GET
    mock.onGet("http://127.0.0.1:8000/list/").reply(200, mockTasks);

    const tasks = await service.listTasks();

    expect(tasks).toEqual(mockTasks); // Verificar que las tareas son correctas
  });

  test("should return success message when createTask is called", async () => {
    const newTask: Task = { _id: 2, title: "New Task", description: "Task description" };
    
    // Configurar el mock para responder a la solicitud POST
    mock.onPost("http://127.0.0.1:8000/create/").reply(201, { message: "Task created successfully!" });

    const message = await service.createTask(newTask);

    expect(message).toBe("Task created successfully!"); // Verificar el mensaje de éxito
  });

  test("should return success message when updateTask is called", async () => {
    const updatedTask: Task = { _id: 1, title: "Updated Task", description: "Updated description" };
    
    // Configurar el mock para responder a la solicitud PUT
    mock.onPut("http://127.0.0.1:8000/update/").reply(200, { message: "Task updated successfully!" });

    const message = await service.updateTask(updatedTask);

    expect(message).toBe("Task updated successfully!"); // Verificar el mensaje de éxito
  });

  test("should return success message when deleteTask is called", async () => {
    const taskId = 1;

    // Configurar el mock para responder a la solicitud DELETE
    mock.onDelete("http://127.0.0.1:8000/delete/").reply(200, { message: "Task deleted successfully!" });

    const message = await service.deleteTask(taskId);

    expect(message).toBe("Task deleted successfully!"); // Verificar el mensaje de éxito
  });

  test("should throw error if createTask fails", async () => {
    const newTask: Task = { _id: 2, title: "New Task", description: "Task description" };
    
    // Configurar el mock para responder con un error
    mock.onPost("http://127.0.0.1:8000/create/").reply(400, { error: "Failed to create task" });

    // Verificar que la función lanza un error
    await expect(service.createTask(newTask)).rejects.toThrowError("Unexpected HTTP status: 400");
  });
});
