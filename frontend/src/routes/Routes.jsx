import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import User from "./User";
import Tasks from "./Tasks";
import Default from "./Default";


const RoutesList = () => {
    return (
        <Routes>
            <Route
                path="/login"
                element={<Login />}
            />
            <Route
                path="/register"
                element={<Register/>}
            />
            <Route
                path="/dashboard"
                element={<Dashboard/>}
            />
            <Route
                path="/tasks"
                element={<Tasks/>}
            />
            <Route
                path="/user"
                element={<User/>}
            />
            <Route
                path="*"
                element={<Default/>}
            />
        </Routes>
    );
};

export default RoutesList;
