//* Imporing the css files
import "./App.css";

//* Importing the npm packages
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//* Importing the user defined files
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import DashboardPage from "./Pages/Dashboard";
import UserPage from "./Pages/User";
import TasksPage from "./Pages/Tasks";


function App(){
    return (
        <AuthProvider>
            <AuthRouter />
        </AuthProvider>
    );
}

function AuthRouter() {
    const { isAuthenticated } = useAuth();
    return (
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route 
                            path="/login"
                            element={isAuthenticated ? <DashboardPage /> : <LoginPage />}
                        />
                        <Route 
                           path="/register"
                           element={<RegisterPage />}
                        />
                        <Route
                            path="/dashboard"
                            element={isAuthenticated ? <DashboardPage/> : <LoginPage/>}
                        />
                        <Route
                            path="/tasks"
                            element={isAuthenticated ? <TasksPage/> : <LoginPage/>}
                        />
                        <Route
                            path="/user"
                            element={isAuthenticated ? <UserPage/> : <LoginPage/>}
                        />
                        <Route
                            path="*"
                            element={isAuthenticated ? <DashboardPage/> : <LoginPage/>}
                        />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
    );
}

export default App;