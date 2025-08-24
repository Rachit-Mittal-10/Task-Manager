import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    logout();
    navigate("/login", { replace: true });
};

export default Logout;