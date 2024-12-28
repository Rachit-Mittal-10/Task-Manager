import API from "./axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TaskAPI = (() => {
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

    return {
        createTask,
        getTasks,
        getTask,
    }
})();

export default TaskAPI;