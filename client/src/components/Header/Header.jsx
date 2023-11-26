import React, { useContext, useEffect, useState } from "react";
import './HeaderStyles.css';
import { useNavigate } from "react-router-dom";
import { HOST } from "config";
import { UserContext } from "data/UserContext";
import { getCookie } from "Pages/LoginPage/LoginPage";


const Header = () => {
    const [loading, setLoading] = useState(true);
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('fetching user info')
        fetch(`${HOST}/api/users/get-my-info` ,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }) 
        .then(async response => {
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || 'Something went wrong!');
            }
            return response.json()
        })
        .then(data => {
            console.log('setting user');
            setUser({name: data.name, role: data.role});
        })
        .catch(err => {
            console.log(err.message);
            setUser({name: 'unknown', role: 'guest'});
        })
        .finally(() => setLoading(false))
    }, []);

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
            // setLoggedIn(false);
            navigate('/login');
        })
    }


    const LoginButton = () => {
        if (user.role === 'guest') {
            return (
                <button className="btn btn-success" onClick={() => navigate('/login')}>Login</button>
            )
        }
        else {
            return (
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            )
        }
    }
        

    return (
        <header>
            <h1>Header</h1>
            {user.name && <h2>login: {user.name}</h2>}
            {user.role && <h2>role: {user.role}</h2>}
            {loading && <p> Loading user info...</p>}
            <nav id='buttons'>
                {user.role !== 'guest' && <button className="btn btn-primary" onClick={() => navigate('/')}>Home</button>}
                {/* <button className="btn btn-success" onClick={() => navigate('/login')}>Login</button> */}
                <LoginButton />
                {user.role==='admin' && <button className="btn btn-success" onClick={() => navigate('/users')}>Users</button>}
                <button className="btn btn-success" onClick={() => navigate('/subjects')}>Subjects</button>
                {(user.role === 'teacher' || user.role === 'scheduler' || user.role === 'admin') && <button className="btn btn-success" onClick={() => navigate('/rooms')}>Rooms</button>}
                {user.role === 'admin' && <button className="btn btn-info" onClick={() => navigate('/users/create-user')}>Create User</button>}
                {user.role === 'admin' && <button className="btn btn-info" onClick={() => navigate('/users/change-user-role')}>Change role</button>}
                {user.role === 'admin' && <button className="btn btn-info" onClick={() => navigate('/subjects/create-subject')}>Create Subject</button>}
                {user.role === 'admin' && <button className="btn btn-info" onClick={() => navigate('/rooms/create-room')}>Create Room</button>}
                {user.role === 'student' && <button className="btn btn-info" onClick={() => navigate('/subjects/my-subjects')}>My subjects</button>}
                {user.role === 'teacher' && <button className="btn btn-info" onClick={() => navigate('/subjects/teacher-page')}>Teach</button>}
                <button className="btn btn-info" onClick={() => navigate('/subjects/request-page')}>Requests</button>
                <button className="btn btn-info" onClick={() => navigate('/subjects/my-requests')}>My Requests</button>


                {/* {user.role === 'scheduler' && <button className="btn btn-info" onClick={() => navigate('/subjects/request-page')}>Requests</button>} */}

                {user.role === 'scheduler' && <button className="btn btn-danger" onClick={() => navigate('/activities/create-activity')}>Create Activity</button>}

            </nav>
        </header>
    )
}

export default Header;
