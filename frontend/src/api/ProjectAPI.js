import API from "./axiosInstance";

const ProjectAPI = (() => {
    const createProject = async (projectData) => {
        try {
            const response = await API.post("/projects", projectData);
            return response.data;
        } catch (err) {
            if (err.response) {
                return err.response.data;
            } else {
                console.log(err);
            }
        }
    };

    const getProjects = async () => {
        try {
            const response = await API.get("/projects");
            return response.data;
        } catch (err) {
            if (err.response) {
                return err.response.data;
            } else {
                console.log(err);
            }
        }
    };

    const getProject = async (projectId) => {
        try {
            const response = await API.get(`/projects/${projectId}`);
            return response.data;
        } catch (err) {
            if (err.response) {
                return err.response.data;
            } else {
                console.log(err);
            }
        }
    };

    const updateProject = async (projectId, projectData) => {
        try {
            const response = await API.put(`/projects/${projectId}`, projectData);
            return response.data;
        } catch (err) {
            if (err.response) {
                return err.response.data;
            } else {
                console.log(err);
            }
        }
    };

    const deleteProject = async (projectId) => {
        try {
            const response = await API.delete(`/projects/${projectId}`);
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
        createProject,
        getProjects,
        getProject,
        updateProject,
        deleteProject,
    };
})();

export default ProjectAPI;
