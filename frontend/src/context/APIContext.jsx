import { createContext, useContext } from "react";
import API from "../api/axiosInstance";
import { useAuth } from "./AuthContext";

const APIContext = createContext();

const APIProvider = ({ children }) => {
    const { setToken } = useAuth();
    const login = async (formData) => {
        //* Axios considers any response outside the range of 2xx as error
        try {
            const response = await API.post("/auth/login", formData);
            const token = response.data.token;
            localStorage.setItem("token", token);
            setToken(token);
            return response.data.message;
        } catch (err) {
            if (err.response) {
                console.log(err.response.data.message);
            } else {
                console.log(err);
            }
        }
    };
    const register = async (formData) => {
        try {
            const response = await API.post("/auth/post", formData);
            return response.data.message;
        } catch {
            return err.response.data.message;
        }
    };
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <APIContext.Provider value={{login,register,logout}}>
            {children}
        </APIContext.Provider>
    );
}

const useAPI = () => {
    return useContext(APIContext);
};

export {
    APIProvider,
    useAPI
};