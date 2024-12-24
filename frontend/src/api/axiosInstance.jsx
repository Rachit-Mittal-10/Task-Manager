import axios from "axios";

const API = axios.create({
    baseURL: `http://192.168.10.2:5000`,
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        const unprotetctedPath = ["/register", "/login"];
        
        //* This will check whether token exist or not and endpoint accessed is protected path or not
        if (token && !unprotetctedPath.includes(config.url)) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        console.log(err);
    }
);

export default API;
