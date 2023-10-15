import React from "react";
import './HeaderStyles.css';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    return (
        <header>
            <h1>Header</h1>
            <button className="btn btn-primary" onClick={() => navigate('/')}>Home</button>
            <button className="btn btn-success" onClick={() => navigate('/login')}>Login</button>
        </header>
    )
}

export default Header;