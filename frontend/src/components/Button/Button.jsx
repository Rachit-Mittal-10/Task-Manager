import styles from "./Button.module.scss";

const Button = (props) => {
    // const text = props.text;
    const onClick = props.onClick;
    const type = props.type || "button";
    const children = props.children;
    const className = props.className;
    return (
        <>
            <button className={`${styles.Button} ${className || ""}`} type={type} onClick={onClick}>
                {children}
            </button>
        </>
    );
};

export default Button;
