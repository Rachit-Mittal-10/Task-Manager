import { consoleFormData } from "../utils/utils";
import API from "./axiosInstance";

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
            return response.data;
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
            const response = await API.get(`/tasks/${taskId}`);
            return response.data;
        } catch (err) {
            if (err.response) {
                return err.response.data;
            } else {
                console.log(err);
            }
        }
    };

    const updateTask = async (taskId, formData) => {
        consoleFormData(formData);
        try{
            const response = await API.put(`/tasks/${taskId}`,formData);
            return response.data;
        }
        catch(err){
            if(err.response){
                return err.response.data;
            }
            else{
                console.log(err);
            }
        }
    };

    return {
        createTask,
        getTasks,
        getTask,
        updateTask
    };
})();

export default TaskAPI;
