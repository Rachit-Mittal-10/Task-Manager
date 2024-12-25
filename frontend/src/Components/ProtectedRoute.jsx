/* eslint-disable no-unused-vars */
import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginRoute from "../Routes/LoginRoute";

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();
    return (
        <Route
            {...rest}
            render = {(props) => {
                isAuthenticated ? <Component {...props} /> : <LoginRoute/>
            }}
        />
    );
};

export default ProtectedRoute;