import { Route, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginPage from "../Pages/Login";
import RegisterPage from "../Pages/Register";
import DashboardPage from "../Pages/Dashboard";
import UserPage from "../Pages/User";
import TasksPage from "../Pages/Tasks";
import { Fragment } from "react";

const RoutesList = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    return (
        <Fragment>
            <Route
                path="/login"
                element={isAuthenticated ? navigate("/dashboard", { replace: true } ) : <LoginPage />}
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route
                path="/dashboard"
                element={isAuthenticated ? <DashboardPage /> : navigate("/login", { replace: true } ) }
            />
            <Route
                path="/tasks"
                element={isAuthenticated ? <TasksPage /> : navigate("/login", { replace: true } )}
            />
            <Route
                path="/user"
                element={isAuthenticated ? <UserPage /> : navigate("/login", { replace: true } )}
            />
            <Route
                path="*"
                element={isAuthenticated ? <DashboardPage /> : navigate("/login", { replace: true } )}
            />
        </Fragment>
    );
};

export default RoutesList;
