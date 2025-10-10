import RoutesList from "@app/routes";
import styles from "./index.module.scss";

const Main = () => {
    return (
        <main className={styles.main}>
            <RoutesList />
        </main>
    );
};

export default Main;
