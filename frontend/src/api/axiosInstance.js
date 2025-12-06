import axios from "axios";
import config from "@utils/config.js";

const DEFAULT_LOCALHOST = `http://localhost:3000`;
//* Storing some common thing and creating the instance
const CONFIG_BASE_URL = (await config.get("baseUrl")) || "";
const API = axios.create({
    baseURL: CONFIG_BASE_URL || DEFAULT_LOCALHOST,
    // baseURL: `http://localhost:3000`
    // baseURL: `http://backend:3000`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

//* this returns whether end point is protected or not
//* parameter::
//*     url : string
//* return:
//*     boolean
const checkProtected = (url) => {
    const unprotetctedPath = ["/login", "/register"];
    return !unprotetctedPath.some((item) => url.includes(item));
};

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        //* This will check whether token exist or not and endpoint accessed is protected path or not
        if (token && checkProtected(config.url)) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        console.log(err);
    },
);

export default API;
