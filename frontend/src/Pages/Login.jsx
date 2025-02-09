import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { classifyInput } from "../utils/sanitizeInput";
import Button from "../Components/Button";
import styles from "./Login.module.scss";

const LoginPage = () => {
    const { login } = useAuth();
    const [identifier, setIdentifier] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!identifier || !password) {
            setError("Both input fields are required.");
            return;
        }
        let keyIdentifier = classifyInput(identifier) ? "email" : "username";
        const formData = new FormData();
        formData.append(keyIdentifier, identifier);
        formData.append("password", password);
        try {
            const response = await login(formData);
            if (response.status === 200) {
                navigate("/dashboard");
            } else if (response.status === 401) {
                setError("Login Failed. Invalid Credentials");
            }
        } catch (err) {
            setError(err.message || "Unexpected Error occured");
        }
    };

    return (
        <div className={styles.Login}>
            <div>
                <h2>Login</h2>
            </div>
            <div>
                <div>{error && <p>{error}</p>}</div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="identifier">Username or Email:</label>
                        <input
                            id="identifier"
                            placeholder="Username or Email"
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            autoComplete="on"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
