import { Route, Routes } from "react-router-dom";
import Dashboard from "../../features/Dashboard/Dashboard.routes";
import Login from "../../features/Login/Login.routes";
import Register from "./Register";
import User from "./User";
import Tasks from "./Tasks";
import Default from "./Default";
import Logout from "./Logout";


const RoutesList = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/user" element={<User />} />
            <Route path="/logout" element={<Logout />}/>
            <Route path="*" element={<Default />} />
        </Routes>
    );
};

export default RoutesList;
