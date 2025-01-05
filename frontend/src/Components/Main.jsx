import RoutesList from "../routes/Routes";
import styles from "./Main.module.scss";

const Main = () => {
    return (
        <main className={styles.main}>
            <RoutesList />
        </main>
    );
}

export default Main;