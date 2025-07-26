import styles from "./CloseButton.module.scss";
import close from "../../assets/images/close.png";
import Button from "../Button/Button";

const CloseButton = (props) => {
    return (
        <>
            <Button
                onClick={props.onClick}
            >
                <img
                    src={close}
                    alt="Close Button"
                />
            </Button>
        </>
    );
};

export default CloseButton;