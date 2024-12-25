import axios from "axios";

const API = axios.create({
    baseURL: `http://192.168.10.1:5000`,
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
});

const checkProtected = (url) => {
    const unprotetctedPath = ["/login", "/path"];
    return !(unprotetctedPath.some((item) => url.includes(item)));
};

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        //* This will check whether token exist or not and endpoint accessed is protected path or not
        if (token && checkProtected(url)) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        console.log(err);
    },
);

export default API;
