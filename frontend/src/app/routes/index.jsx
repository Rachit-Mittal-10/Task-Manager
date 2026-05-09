import { Route, Routes } from "react-router-dom";
import Dashboard from "@features/Dashboard/Dashboard.routes";
import Login from "@features/Login/Login.routes";
import Register from "@features/Register/Register.routes";
import User from "@features/Users/User.routes";
import Tasks from "@features/Tasks/Tasks.routes";
import Projects from "@features/Projects/Projects.routes";
import ProjectTasks from "@features/Projects/ProjectTasks.routes";
import Default from "@features/Default/Default";
import Logout from "@features/Logout/Logout";


const RoutesList = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId/tasks" element={<ProjectTasks />} />
            <Route path="/user" element={<User />} />
            <Route path="/logout" element={<Logout />}/>
            <Route path="*" element={<Default />} />
        </Routes>
    );
};

export default RoutesList;
