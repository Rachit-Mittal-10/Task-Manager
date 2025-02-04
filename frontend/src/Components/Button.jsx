import styles from "./Button.module.scss";

const Button = (props) => {
    // const text = props.text;
    const onClick = props.onClick;
    const type = props.type;
    const children = props.children;
    return (
        <>
            <button className={styles.Button} type={type} onClick={onClick}>
                {children}
            </button>
        </>
    );
};

export default Button;
