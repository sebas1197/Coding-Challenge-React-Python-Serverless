import axios, { AxiosResponse } from "axios";
import { Login } from "../models/login.model";


export class LoginService {

    private API_BASE: string = process.env.REACT_APP_LOCAL_BACKEND_URL || "";

    public async login(login: Login): Promise<string> {
        try {
            const response: AxiosResponse<{ message: string }> = await axios.post(`${this.API_BASE}/login/`, login);
            if (response.status === 201) {
                return response.data.message;
            }
            throw new Error(`Unexpected HTTP status: ${response.status}`);
        } catch (error) {
            throw error;
        }
    }


}