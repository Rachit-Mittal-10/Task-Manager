
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button/Button";
import styles from "./Register.module.scss";

const RegisterPage = () => {
    const { register } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [lastname, setLastname] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!username || !email || !password || !firstname) {
            setError("Username, email, password and first name are required");
            return;
        }

        const payload = {
            username,
            email,
            password,
            firstname,
        };

        if (middlename.trim()) {
            payload.middlename = middlename.trim();
        }

        if (lastname.trim()) {
            payload.lastname = lastname.trim();
        }

        if (age !== "") {
            payload.age = Number(age);
        }

        try {
            const response = await register(payload);
            if (response?.status === 201) {
                navigate("/login");
            } else {
                setError(response?.message || response?.data?.message || "Registration failed");
            }
        } catch (err) {
            setError(err?.message || "Failed to register user");
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.heading}>
                    <h2>Create your account</h2>
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <p className={styles.formHint}>
                        <span className={styles.requiredTag}>*</span> Required fields
                    </p>
                    <div className={styles.field}>
                        <label htmlFor="firstname">
                            First Name <span className={styles.requiredTag}>*</span>
                        </label>
                        <input
                            id="firstname"
                            name="firstname"
                            placeholder="Enter first name"
                            type="text"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            autoComplete="given-name"
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="username">
                            Username <span className={styles.requiredTag}>*</span>
                        </label>
                        <input
                            id="username"
                            name="username"
                            placeholder="Choose a username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="email">
                            Email <span className={styles.requiredTag}>*</span>
                        </label>
                        <input
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="middlename">
                            Middle Name <span className={styles.optionalTag}>(Optional)</span>
                        </label>
                        <input
                            id="middlename"
                            name="middlename"
                            placeholder="Enter middle name"
                            type="text"
                            value={middlename}
                            onChange={(e) => setMiddlename(e.target.value)}
                            autoComplete="additional-name"
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="lastname">
                            Last Name <span className={styles.optionalTag}>(Optional)</span>
                        </label>
                        <input
                            id="lastname"
                            name="lastname"
                            placeholder="Enter last name"
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            autoComplete="family-name"
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="age">
                            Age <span className={styles.optionalTag}>(Optional)</span>
                        </label>
                        <input
                            id="age"
                            name="age"
                            placeholder="Enter age"
                            type="number"
                            min={0}
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="password">
                            Password <span className={styles.requiredTag}>*</span>
                        </label>
                        <input
                            id="password"
                            name="password"
                            placeholder="Create a password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <Button type="submit" className={styles.submitButton}>
                        Register
                    </Button>
                </form>

                <p className={styles.footerText}>
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
