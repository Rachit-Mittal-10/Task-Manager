import styles from "./Button.module.scss";

const Button = (props) => {
    const text = props.text;
    const onClick = props.onClick;
    const type = props.type;
    return (
        <>
            <button className={styles.Button} type={type} onClick={onClick}>
                {text}
            </button>
        </>
    );
};

export default Button;
