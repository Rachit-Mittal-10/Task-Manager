import { useState } from "react";
import { useAPI } from "../context/APIContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const { register } = useAPI();
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
        <div className="register">
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
                            required
                        />
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            name="email"
                            placeholder="Email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={password}
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

export default RegisterPage;
