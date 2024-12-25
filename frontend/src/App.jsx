import "./App.css";

import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LoginRoute from "./Routes/LoginRoute";
import RegisterRoute from "./Routes/RegisterRoute";
import DashboardRoute from "./Routes/DashboardRoute";
import UserRoute from "./Routes/UserRoute";
import TasksRoute from "./Routes/TasksRoute";


function App() {
    return (
        <div className="App">
            <AuthProvider>
                <BrowserRouter>
                    <Switch>
                        <LoginRoute />
                        <RegisterRoute />
                        <DashboardRoute />
                        <UserRoute />
                        <TasksRoute />                       
                    </Switch>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;