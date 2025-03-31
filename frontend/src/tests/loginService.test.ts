import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { LoginService } from "./login.service";
import { Login } from "../models/login.model";

// Crear una instancia del mock de axios
const mock = new MockAdapter(axios);

describe("LoginService", () => {
  let service: LoginService;

  beforeEach(() => {
    service = new LoginService();
  });

  afterEach(() => {
    mock.reset(); // Limpiar mocks después de cada prueba
  });

  test("should return message when login is successful", async () => {
    const loginData: Login = { username: "test", password: "password" };
    
    // Configurar el mock para responder a la solicitud POST
    mock.onPost("http://127.0.0.1:8000/login/").reply(201, { message: "Login successfully!" });

    const message = await service.login(loginData);

    expect(message).toBe("Login successfully!"); // Verificar que el mensaje es correcto
  });

  test("should throw error if login fails", async () => {
    const loginData: Login = { username: "test", password: "wrongpassword" };

    // Configurar el mock para responder con un error
    mock.onPost("http://127.0.0.1:8000/login/").reply(400, { error: "Invalid credentials" });

    // Verificar que la función lanza un error
    await expect(service.login(loginData)).rejects.toThrowError("Unexpected HTTP status: 400");
  });
});
