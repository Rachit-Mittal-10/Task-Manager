import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardPage from "../Pages/Dashboard";
import { useEffect } from "react";

const Dashboard = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login", { replace: true });
        }
    }, [isAuthenticated, navigate]);
    return <DashboardPage />;
};

export default Dashboard;
