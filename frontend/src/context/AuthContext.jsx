import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { checkTokenExpiry } from "../utils/utils.js";
import AuthAPI from "../api/AuthAPI.js";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    useEffect(() => {
        if (token) {
            try {
                const payload = jwtDecode(token);
                if (checkTokenExpiry(payload)) {
                    logout();
                } else {
                    setUser(payload);
                }
            } catch {
                logout();
            }
        } else {
            logout();
        }
    }, [token]);

    const logout = () => {
        AuthAPI.logout({ setToken, setUser, setIsAuthenticated });
    };

    const login = (formData) => {
        return AuthAPI.login(formData, { setToken, setIsAuthenticated });
    };

    const AuthObject = {
        user,
        isAuthenticated,
        setToken,
        setIsAuthenticated,
        setUser,
        login,
        logout,
        register: AuthAPI.register,
    };
    return (
        <AuthContext.Provider value={AuthObject}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { useAuth, AuthProvider };
