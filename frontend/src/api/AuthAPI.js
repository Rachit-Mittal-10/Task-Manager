import API from "./axiosInstance";

const AuthAPI = (function () {
    const login = async (formData, { setToken }) => {
        //* Axios considers any response outside the 2xx as error
        try {
            const response = await API.post("/auth/login", formData);
            const token = response.data.token;
            localStorage.setItem("token", token);
            setToken(token);
            return response.data;
        } catch (err) {
            if (err.response) {
                return err.response.data;
            } else {
                console.log(err);
            }
        }
    };

    const logout = ({setToken, setUser, setIsAuthenticated}) => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    const register = async (formData) => {
        try {
            const response = await API.post("/auth/register", formData);
            return response.data;
        } catch (err) {
            if (err.response) {
                return err.response.data;
            } else {
                console.log(err);
            }
        }
    };

    return {
        login,
        logout,
        register,
    };
})();

export default AuthAPI;
