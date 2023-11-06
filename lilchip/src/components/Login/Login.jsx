import React from 'react';
import './Login.css'

const Login = () => {
    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Log in</div>
            </div>
            <div className='input'>
                <input type='text' placeholder='Username' />
            </div>
            <div className='header'>
                <div className='text'>Password</div>
            </div>
            <div className='input'>
                <input type='password' placeholder='Password' />
            </div>
            <div className='buttons'>
                <button className='button back'>cancel</button>
                <button className='button login'>Login</button>
            </div>
        </div>
    );
}

export default Login