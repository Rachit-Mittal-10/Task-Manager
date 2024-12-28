import { createContext, useContext } from "react";
import API from "../api/axiosInstance";
import { useAuth } from "./AuthContext";

const APIContext = createContext();

const APIProvider = ({ children }) => {
    const { setToken } = useAuth();

    const login = async (formData) => {
        //* Axios considers any response outside the range of 2xx as error
        try {
            const response = await API.post("/auth/login", formData);
            const token = response.data.token;
            localStorage.setItem("token", token);
            setToken(token);
            return response.data;
        } catch (err) {
            if (err.response) {
                return err.response.data;
            } else {
                console.log(err);
            }
        }
    };

    const register = async (formData) => {
        try {
            const response = await API.post("/auth/register", formData);
            console.log(response.data.message);
            return response.data;
        } catch (err) {
            if (err.response) {
                return err.response.data;
            } else {
                console.log(err);
            }
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    const createTask = async (tasksData) => {
        try {
            const response = await API.post("/tasks", tasksData);
            return response.data;
        } catch (err) {
            if (err.response) {
                return err.response.data;
            } else {
                console.log(err);
            }
        }
    };

    const getTasks = async () => {
        try {
            const response = await API.get("/tasks");
            return response.data.message;
        } catch (err) {
            if (err.response) {
                return err.response.data;
            } else {
                console.log(err);
            }
        }
    };

    const getTask = async (taskId) => {
        try {
            const response = await API.get("/task/", {
                params: { taskId },
            });
        } catch (err) {
            if (err.response) {
                return err.response.data;
            } else {
                console.log(err);
            }
        }
    };

    return (
        <APIContext.Provider value={{ login, register, logout }}>
            {children}
        </APIContext.Provider>
    );
};

const useAPI = () => {
    return useContext(APIContext);
};

export { APIProvider, useAPI };
