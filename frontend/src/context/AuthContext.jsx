import React, { createContext, useState, useEffect, useContext } from "react";

import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        if (token) {
            try {
                const payload = jwtDecode(token);
                console.log(payload);
                setUser(payload);
            } catch {
                logout();
            }
        }
    }, [token]);

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { useAuth, AuthProvider };
