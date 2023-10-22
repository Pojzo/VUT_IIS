import React from "react";
import './UserPageStyles.css';
import Header from "components/Header/Header";
import Fuse from "fuse.js";

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const User = props => {
    const navigate = useNavigate();
    const handleUserClick = login => {
        navigate(`/users/user/${login}`, {
            state: {

            login: login
            }
        });
    }
    return (
        <tr>
            <th scope="row" onClick={() => handleUserClick(props.login)}>{props.login}</th>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.birthDate}</td>
            <td>{props.gender}</td>
        </tr>
    )
}

const UsersList = ({stringFilter}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })

    }, [stringFilter])

    if (loading) {
        return <p>Loading...</p>
    }
    let users;
    if (stringFilter.length !== 0) {
        const options = { includeScore: true, threshold: 0.4, keys: ['name', 'email'] }
        const fuse = new Fuse(data, options);
        const filteredData = fuse.search(stringFilter).map(person => person.item);
        // console.log(filteredData,  stringFilter);

        users = filteredData.map(person =>
            <User key={person.id} id={person.id} name={person.name} gender={person.gender} birthDate={person.birth_date} email={person.email} address={person.address} login={person.login} />
        )
    }
    else {
        users = data.map(person =>
            <User id={person.id} name={person.name} gender={person.gender} birthDate={person.birth_date} email={person.email} address={person.address} login={person.login} />
        )

    }
    return (
        <table className="table table-striped table-bordered">
            <thead className="table-dark">
                <tr>
                    <th scope="col">login</th>
                    <th scope="col">name</th>
                    <th scope="col">email</th>
                    <th scope="col">birth_date</th>
                    <th scope="col">gender</th>
                </tr>
            </thead>
            <tbody>
                {users}
            </tbody>
        </table>
    )
}

const UsersFilter = (props) => {
    const handleStringFilterChange = event => {
        props.filterChangeCallback(event.target.value);
    }
    return (
        <div className="navbar-container">
            <label htmlFor="user-search">User</label>
            <input type="search" name="user-search" id="user-search" placeholder="Search user" aria-label="Search user" onChange={handleStringFilterChange} />
        </div>
    )
}

const UsersPage = () => {
    const [stringFilter, setStringFilter] = useState("");
    const filterChangeCallback = newValue => {
        setStringFilter(newValue);
    }
    return (
        <>
            <Header />
            <div className='users-container'>
                <UsersFilter filterChangeCallback={filterChangeCallback} />
                <UsersList stringFilter={stringFilter} />
            </div>
        </>
    )
}

export const UserPage = () => {
    const { login } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:5000/users/user/${login}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
    }, [login])
    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <>
        <h1>{login}</h1>
        <ul>
            {Object.keys(data).map(key => <li>{key}: {data[key]}</li>)}

        </ul>
        </>
    )
}

export default UsersPage;