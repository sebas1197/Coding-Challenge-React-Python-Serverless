import { Login } from "../models/login.model";


export class LoginService {

    loginService = (credentials: Login): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (credentials.username === "user" && credentials.password === "password") {
                    resolve(true);
                } else {
                    reject(new Error("Invalid credentials"));
                }
            }, 1000);
        });
    };

}