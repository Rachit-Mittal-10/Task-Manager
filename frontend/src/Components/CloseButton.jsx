import styles from "./CloseButton.module.scss";
import close from "../assets/images/close.png";

const CloseButton = (props) => {
    return (
        <>
            <button
                onClick={props.onClick}
                className={styles.button}
            >
                <img
                    src={close}
                    alt="Close Button"
                />
            </button>
        </>
    );
};

export default CloseButton;