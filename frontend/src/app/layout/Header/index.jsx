import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import styles from "./index.module.scss";

const Header = () => {
    const { isAuthenticated } = useAuth();
    const { pathname } = useLocation();
    const hideHeaderPaths = ["/login", "/register"];

    if (hideHeaderPaths.includes(pathname)) {
        return null;
    }

    return (
        <header className={styles.header}>
            <nav>
                <ul>
                    <li>
                        <Link to="/register" className={styles.link}>
                            Register
                        </Link>
                    </li>
                    {!isAuthenticated && (
                        <li>
                            <Link to="/login" className={styles.link}>
                                Login
                            </Link>
                        </li>
                    )}
                    {isAuthenticated && (
                        <>
                            <li>
                                <Link to="/dashboard" className={styles.link}>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/tasks" className={styles.link}>
                                    Tasks
                                </Link>
                            </li>
                            <li>
                                <Link to="/user" className={styles.link}>
                                    User
                                </Link>
                            </li>
                            <li>
                                <Link to="/logout" className={styles.link} >
                                    Logout
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
