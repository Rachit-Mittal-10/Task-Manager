import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ProjectsPage from "./Projects";

const Projects = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login", { replace: true });
        }
    }, [isAuthenticated, navigate]);
    return <ProjectsPage />;
};

export default Projects;
