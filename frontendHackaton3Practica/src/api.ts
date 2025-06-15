import type { AxiosInstance } from "axios";
import axios from "axios";
import type { GetTasks } from "./JsonFormat/GetTasks";
import type { PostLogin } from "./JsonFormat/PostLogin";

class API {
    private apiInstance: AxiosInstance;

    constructor() {
        this.apiInstance = axios.create({
            baseURL: "http://127.0.0.1:8000",
        });

        this.apiInstance.interceptors.request.use((config) => {
            console.log("Request:", `${config.method?.toUpperCase()} ${config.url}`);
            return config;
        });

        this.apiInstance.interceptors.response.use(
            (response) => {
                console.log("Response:", response.data);
                return response;
            },
            (error) => {
                console.log("Error:", error);
                return Promise.reject(error);
            }
        );
    }

    getTasks(username: string) {

        return this.apiInstance.get<GetTasks>(`/users/${username}`);
    }

    loginUser(credentials: { username: string; password: string }) {
        return this.apiInstance.post<PostLogin>('/api/auth/login/',  credentials)
            .then(res => res.data);
    }


}

export default new API();