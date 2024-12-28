import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { classifyInput } from "../utils/sanitizeInput";

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
            console.log(response.message);
            if (response.message) {
                console.log("near the dashboard");
                navigate("/dashboard");
            }
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="login">
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
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
