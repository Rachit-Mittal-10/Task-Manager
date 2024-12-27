import { useState } from "react";
import { useAPI } from "../context/APIContext";


const RegisterPage = () => {
    const { register } = useAPI();
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        
    };
    return <h1>Register page</h1>;
};

export default RegisterPage;
