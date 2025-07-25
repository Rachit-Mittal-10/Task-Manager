import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthAPI from "../../api/AuthAPI";

const Logout = () => {
    const { setToken, setUser, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    AuthAPI.logout({setToken,setUser,setIsAuthenticated});
    navigate("/login", { replace: true });
};

export default Logout;