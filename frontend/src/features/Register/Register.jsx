import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button/Button";
import styles from "./Register.module.scss";

const RegisterPage = () => {
    const { register } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!username || !email || !password) {
            setError("All three input required");
            return;
        }
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        try {
            const message = await register(formData);
            if (message) {
                navigate("/login");
            }
        } catch (err) {
            setError(err);
        }
    };
    return (
        <div className={styles.Register}>
            <div>
                <h2>Register</h2>
            </div>
            <div>
                <div>{error && <p>{error}</p>}</div>
                <form>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            name="username"
                            placeholder="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="on"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            name="email"
                            placeholder="Email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="on"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <div>
                        <Button 
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Resgister
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
