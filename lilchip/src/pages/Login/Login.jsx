import React, { useState, useContext } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";
import axios from "axios"

import Button from "../../components/Button/Button";

const Login = () => {

    const [input, setInput] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate()

    const [errors, setErrors] = useState([]);

    const handlechange = (event) => {
        const { name, value } = event.target;
        setInput({
            ...input,
            [name]: value,
        })
    }


    const validate = async () => {
        const newErrors = {};
        let isValid = true;

        try {
            const response = await axios.post("http://localhost:5000/login", input)

            if (response.status === 200) {
                if (!input.username) {
                    isValid = false;
                    newErrors.username = "Please enter your username.";
                } else if (input.username.length < 6) {
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
            } else {
                isValid = false
                newErrors.password = "Invalid credentials"
            }
        } catch (error) {
            isValid = false;
            newErrors.password = "Error during login"
        }

        setErrors(newErrors);
        return isValid
    }

    const handleLogin = async (event) => {
        event.preventDefault();

        if (await validate()) {
            console.log(input);

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
                <div className="text danger">{errors.username}</div>
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
        </div>
    );
}

export default Login