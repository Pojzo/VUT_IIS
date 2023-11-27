import React, { } from "react";
import './LoginPageStyles.css';
import Header from "../../components/Header/Header";

import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { HOST } from "config";


export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const LoginPage = () => {
    // try to login using cookie

    const [loggedIn, setLoggedIn] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [failedPassword, setFailedPassword] = useState(false);

    const navigate = useNavigate();

    const validateForm = e => {
        if (login.length === 0) {
            alert('Login cannot be empty');
            e.preventDefault();
            return false;
        }
        return true;
    }

    // try it using session id
    useEffect(() => {
        const sessionId = getCookie('sessionId');
        fetch(`${HOST}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId }),
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'CORRECT_PASSWORD') {
                    console.log('logged in with cookie');
                    setLoggedIn(true);
                }
            })
            .catch(err => {
                console.log('failed to authenticate with cookie', err)
                setLoggedIn(false)
            })
    }, [loggedIn])

    const handleSubmit = async e => {
        e.preventDefault();
        if (!validateForm(e)) {
            return;
        }
        try {
            const response = await fetch(`${HOST}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
                credentials: 'include'
            })
            const responseData = await response.json();
            const message = await responseData.message;
            console.log(responseData);
            if (!response.ok) {
                setFailedPassword(true);
                console.log('Something went wrong');
                return;
            }
            if (message === 'CORRECT_PASSWORD') {
                setLoggedIn(true);

                navigate('/');
                console.log('conntected');
            }
            else {
                console.log('Not connected');
            }
        }
        catch (err) {
            console.log('An error occured', err);
        }
    }
    const handleLogout = () => {
        const sessionId = getCookie('sessionId');
        fetch(`${HOST}/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId }),
            credentials: 'include'
        })
            .then(() => {
                setLoggedIn(false);
                navigate('/login');
            })
    }
    const FailedPasswordMessage = () => {
        if (failedPassword) {
            return (
                <div className="alert alert-danger" role="alert">
                    Wrong password
                </div>
            )
        }
    }
    const token = localStorage.getItem('IIS_TOKEN');
    if (token) {
        fetch('http')
    }
    if (loggedIn) {
        return (
            <>
                <p>LOGGED IN</p>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </>
        )
    }
    return (
        <>
            <Header />
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="login-text">Login</label>
                        <input name="login" type="text" className="form-control" id="login-text" aria-describedby="loginHelp" placeholder="Enter login" onChange={e => setLogin(e.target.value)} required/>
                        <small id="login-help" className="form-text text-muted"></small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">Password</label>
                        <input name="password" type="password" className="form-control" id="login-password" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
                    </div>
                    <FailedPasswordMessage />
                    <button className="btn btn-primary mb-2 background-accent text" id="login-btn" type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default LoginPage;