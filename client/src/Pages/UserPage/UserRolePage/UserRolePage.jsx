import Header from "components/Header/Header";
import { ROLES } from "config";
import { HOST } from "config";
import React, { useState, useEffect } from "react";

export const UserRolePage = (props) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [submitMessage, setSubmitMessage] = useState(null);
    const [role, setRole] = useState('student');

    useEffect(() => {
        fetch(`${HOST}/api/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then(async response => {
                if (!response.ok) {
                    let err;
                    if (response.status === 404) err = { message: '404 Invalid response from the server' }
                    else err = await response.json();
                    throw new Error(err.message ? err.message : 'Something went wrong');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setUsers(data)
                setValuesOnFetch();
                setError(null)
            })
            .catch(err => {
                setError(err.message);
            })

    }, [])
    console.log(users)
    const setValuesOnFetch = () => {
        const firstUser = users[0];
        const firtsLogin = firstUser.login;
        const firstRole = firstUser.role;
        document.getElementById('user-select').value = firtsLogin;
        document.getElementById('role-select').value = firstRole;
    }

    const handleUserChange = e => {
        const userRole = users.find(user => user.login === e.target.value).role;

        const roleSelect = document.getElementById('role-select');

        roleSelect.value = userRole;
        console.log(userRole)
    }

    const handleSubmit = e => {
        const data = {
            login: document.getElementById('user-select').value,
            role: document.getElementById('role-select').value
        }
        e.preventDefault();
        fetch(`${HOST}/api/users/change-user-role`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then(async response => {
                if (!response.ok) {
                    let err;
                    if (response.status === 404) err = { message: '404 Invalid response from the server' }
                    else err = await response.json();
                    throw new Error(err.message ? err.message : 'Something went wrong');
                }
                return response.json();
            })
            .then(data => {
                setError(null)
                setSubmitMessage(data.message)
            })
            .catch(err => {
                setError(err.message);
                setSubmitMessage(null)
            })
    }

    return (
        <>
            <Header />
            <div className="width-container">
                <>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="user-select">Select user</label>
                            <select className="form-select" name="login" id="user-select" onChange={e => handleUserChange(e)}>
                                {users.map(user =>
                                    <option value={user.login}>{user.login}</option>
                                )}
                            </select>
                            <label htmlFor="role-select">Select role</label>
                            <select className="form-select" name="role" id="role-select">
                                {ROLES.map(role =>
                                    <option value={role}>{role}</option>
                                )}
                            </select>
                        </div>
                        <button style={{
                        }} className="btn btn-info" type="submit">Change role</button>
                    </form>
                    <p style={{ color: 'red' }}>{error}</p>
                    <p style={{ color: 'green' }}>{submitMessage}</p>
                </>
            </div>
        </>
    );
}
