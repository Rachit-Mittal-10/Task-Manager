import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Default = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard", { replace: true });
        } else {
            navigate("/login", { replace: true });
        }
    }, [isAuthenticated, navigate]);
};

export default Default;
