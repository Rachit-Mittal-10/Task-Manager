import API from "./axiosInstance";

const DashboardAPI = (() => {
    const getDashboard = async () => {
        try {
            const data = await API.get("/");
            return data;
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
