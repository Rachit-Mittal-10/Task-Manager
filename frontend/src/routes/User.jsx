import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UserPage from "../Pages/User";
import { useEffect } from "react";

const User = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!isAuthenticated){
            navigate("/login", {replace: true});
        }
    },[isAuthenticated,navigate]);
    return <UserPage/>;
};

export default User;