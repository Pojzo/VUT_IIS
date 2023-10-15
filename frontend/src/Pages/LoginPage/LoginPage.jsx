import React from "react";
import './LoginPageStyles.css';
import Header from "../../components/Header/Header";

const LoginPage = () => {
    return (
        <>
            <Header />
            <div className="login-container">
                <form action="">
                    <div className="form-group">
                        <label htmlFor="login-text">Login</label>
                        <input type="text" className="form-control" id="login-text" aria-describedby="loginHelp" placeholder="Enter login"/>
                            <small id="login-help" className="form-text text-muted"></small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">Password</label>
                        <input type="password" className="form-control" id="login-password" placeholder="Password"/>
                    </div>
                    <button className="btn btn-primary mb-2 background-accent text" id="login-btn" type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default LoginPage;