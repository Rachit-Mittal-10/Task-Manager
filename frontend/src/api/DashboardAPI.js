import API from "./axiosInstance";

const DashboardAPI = (() => {
    const getDashboard = async () => {
        try {
            const response = await API.get("/dashboard");
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
        getDashboard,
    };
})();

export default DashboardAPI;
