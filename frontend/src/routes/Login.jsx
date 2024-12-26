import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginPage from "../Pages/Login";
import { useEffect } from "react";


const Login = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        if(isAuthenticated){
            navigate("/dashboard", {replace: true});
        }
    }, [isAuthenticated, navigate]);
    return <LoginPage/>;
};

export default Login;