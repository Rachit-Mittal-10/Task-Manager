import LoginPage from "../Pages/Login";
import { useAuth } from "../context/AuthContext";
import { Route, Redirect } from "react-router-dom";


const LoginRoute = () => {
    const { isAuthenticated } = useAuth();
    return (
        <Route
            path="/login" 
            render = {(props)=>{
                isAuthenticated ? <Redirect to="/dashboard" /> :<LoginPage {...props} />
            }}
        />
    );
};

export default LoginRoute;