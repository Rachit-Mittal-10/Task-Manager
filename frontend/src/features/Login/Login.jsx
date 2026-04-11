import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { classifyInput } from "@utils/sanitizeInput.js";
import Button from "@components/Button/Button";
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
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.heading}>
                    <h2>Welcome back</h2>
                    <p>Log in to continue managing your tasks.</p>
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label htmlFor="identifier">Username or Email</label>
                        <input
                            id="identifier"
                            placeholder="Enter username or email"
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            autoComplete="username"
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <Button type="submit" className={styles.submitButton}>
                        Login
                    </Button>
                </form>

                <p className={styles.footerText}>
                    Don&apos;t have an account? <Link to="/register">Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
