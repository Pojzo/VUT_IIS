import React from "react";
import './HeaderStyles.css';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    return (
        <header>
            <h1>Header</h1>
            <nav id='buttons'>
                <button className="btn btn-primary" onClick={() => navigate('/')}>Home</button>
                <button className="btn btn-success" onClick={() => navigate('/login')}>Login</button>
                <button className="btn btn-success" onClick={() => navigate('/users')}>Users</button>
                <button className="btn btn-info" onClick={() => navigate('/users/create-user')}>Create User</button>
            </nav>
        </header>
    )
}

export default Header;