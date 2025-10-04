import styles from "./CloseButton.module.scss";
import close from "./assets/close.png";
import Button from "../Button/Button";

const CloseButton = (props) => {
    return (
        <>
            <Button
                onClick={props.onClick}
                className={styles.CloseButton}
            >
                <img
                    src={close}
                    alt="Close Button"
                    // className={styles.CloseImg}
                />
            </Button>
        </>
    );
};

export default CloseButton;