import React, { useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";
import axios from "axios"

import Button from "../../components/Button/Button.jsx";

const Login = () => {


    const [input, setInput] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate()

    const [error, setError] = useState("");

    const handlechange = (event) => {
        const { name, value } = event.target;
        setInput({
            ...input,
            [name]: value,
        })
    }


    const validate = async () => {
        let isValid = true;
        setError("")

        try {
            const response = await axios.post("http://localhost:5000/login", input)

            if (response.status !== 200) {
                isValid = false
                setError("Invalid credentials")
            }

        } catch (error) {
            if (!input.username | !input.password) {
                setError("Please fill in all fields");
            } else {
                setError("Incorrect username or password");
            }

            isValid = false;
        }

        return isValid
    }

    const handleLogin = async (event) => {
        event.preventDefault();

        if (await validate()) {

            setInput({
                username: "",
                password: ""
            });

            navigate("/chip-scan")

            alert("Logged in")
        }
    }

    return (
        <div className="container login">
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
            </div>
            <div className="buttons">
                <Button onClick={handleLogin} label="cancel" variant="3" />
                <Button onClick={handleLogin} label="Login" variant="2" />
            </div>
            <div className="error-message">
                {error && <div className="text danger">{error}</div>}
            </div>
        </div>
    );
}

export default Login