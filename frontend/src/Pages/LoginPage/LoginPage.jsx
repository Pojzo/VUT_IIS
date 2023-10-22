import React from "react";
import './LoginPageStyles.css';
import Header from "../../components/Header/Header";

import { useState } from "react";

const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const validateForm = e => {
        if (login.length === 0) {
            alert('Login cannot be empty');
            e.preventDefault();
        }
    }
    return (
        <>
            <Header />
            <div className="login-container">
                <form action="/login" method="post">
                    <div className="form-group">
                        <label htmlFor="login-text">Login</label>
                        <input name="login" type="text" className="form-control" id="login-text" aria-describedby="loginHelp" placeholder="Enter login" onChange={e => setLogin(e.target.value) }/>
                            <small id="login-help" className="form-text text-muted"></small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">Password</label>
                        <input name="password" type="password" className="form-control" id="login-password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button className="btn btn-primary mb-2 background-accent text" id="login-btn" type="submit" onClick={e => validateForm(e)}>Login</button>
                </form>
            </div>
        </>
    )
}

export default LoginPage;