import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../api/axiosInstance";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        if (token) {
            try {
                const payload = jwtDecode(token);
                setUser(payload);
            } catch {
                logout();
            }
        }
    }, [token]);

    const login = async (formData) => {
        //* Axios considers any response outside the range of 2xx as error
        try{
            const response = await API.post("/auth/login",formData);
            const {token} = response.data.token;
            localStorage.setItem("token", token);
            setToken(token);
            return response.data.message;
        }
        catch(err){
            if(err.response){
                console.log(err.response.data.message);
            }
            else{
                console.log(err);
            }
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    const register = async (formData) => {
        try{
            const response = await API.post("/auth/post",formData);
            return response.data.message;
        }
        catch {
            return err.response.data.message;
        }
    };

    const isAuthenticated = !!token;
    
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
}

export {
    useAuth,
    AuthProvider
};