import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TasksPage from "../Pages/Tasks";
import { useEffect } from "react";

const Tasks = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login", { replace: true });
        }
    }, [isAuthenticated, navigate]);
    return <TasksPage />;
};

export default Tasks;
