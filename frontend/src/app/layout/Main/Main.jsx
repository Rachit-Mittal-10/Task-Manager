import RoutesList from "../../routes/AppRoutes";
import styles from "./Main.module.scss";

const Main = () => {
    return (
        <main className={styles.main}>
            <RoutesList />
        </main>
    );
};

export default Main;
