import API from "./axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthAPI = (function () {
    const { setToken, setUser, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    const login = async (formData) => {
        //* Axios considers any response outside the 2xx as error
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

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        navigate("/login");
    };

    const register = async (formData) => {
        try {
            const response = await API.post("/auth/register", formData);
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
        login,
        logout,
        register,
    };
})();

export default AuthAPI;
