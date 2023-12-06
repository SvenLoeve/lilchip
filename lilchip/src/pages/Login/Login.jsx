import React, { useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";

function Login() {
    const [input, setInput] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate()

    const [errors, setErrors] = useState({});

    const handlechange = (event) => {
        const { name, value } = event.target;
        setInput({
            ...input,
            [name]: value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validate()) {
            console.log(input);

            setInput({
                username: "",
                password: ""
            });

            navigate("/chip-scan")

            alert("Logged in")
        }
    }

    const validate = () => {
        const newErrors = {};
        let isValid = true;

        if (!input.username) {
            isValid = false;
            newErrors.username = "Please enter your username.";
        } else if (input.username.length < 5 || !/^\S*$/.test(input.username)) {
            isValid = false;
            newErrors.username = "Please enter valid username.";
        }

        if (!input.password) {
            isValid = false;
            newErrors.password = "Please enter your password.";
        } else if (input.password.length < 6) {
            isValid = false;
            newErrors.password = "Please add at least 6 characters.";
        }

        setErrors(newErrors);
        return isValid
    }

    const handleLogin = () => {

    }

    return (
        <form className="container login" onSubmit={handleSubmit}>
            <div className="header">
                <div className="text">Log in</div>
            </div>
            <div className="input">
                <input type="text" name="username" value={input.username} onChange={handlechange} placeholder="Username" />
            </div>
            <div className="header">
                <div className="text">Password</div>
            </div>
            <div className="input">
                <input type="password" name="password" value={input.password} onChange={handlechange} placeholder="Password" />
                <div className="text danger">{errors.password}</div>
            </div>
            <div className="buttons">
                <Button onClick={handleLogin} label="cancel" variant="3" />
                <Button onClick={handleLogin} label="Login" variant="2" />
            </div>
        </form>
    );
}

export default Login