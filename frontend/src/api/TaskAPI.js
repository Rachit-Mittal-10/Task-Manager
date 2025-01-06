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
        console.log(`taskId in TaskAPI.getTask: ${taskId}`);
        try {
            const response = await API.get(`/tasks/${taskId}`,);
            return response.data;
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
    };
})();

export default TaskAPI;
