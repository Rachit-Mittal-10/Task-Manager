import { Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RegisterPage from "../Pages/Register";

const RegisterRoute = () => {
    return (
        <Route 
            path = "/register"
            component={RegisterPage}
        />
    );
};

export default RegisterRoute;