import React, { useState } from 'react';
import './Login.css'

const Login = () => {
    const [input, setInput] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handlechange = (event) => {
        const { name, value } = event.target;
        setInput({
            ...input,
            [name]: value,
        })
    }

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Log in</div>
            </div>
            <div className='input'>
                <input type='text' name='username' value={input.username} onChange={handlechange} placeholder='Username' />
            </div>
            <div className='header'>
                <div className='text'>Password</div>
            </div>
            <div className='input'>
                <input type='password' name='password' value={input.password} onChange={handlechange} placeholder='Password' />
            </div>
            <div className='buttons'>
                <button className='button back'>cancel</button>
                <button className='button login'>Login</button>
            </div>
        </div>
    );
}

export default Login