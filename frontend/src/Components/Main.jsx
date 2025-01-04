import RoutesList from "../routes/Routes";
import styles from "./Main.module.scss";

const Main = () => {
    return (
        <div className={styles.main}>
            <RoutesList />
        </div>
    );
}

export default Main;