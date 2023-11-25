import './UserPageStyles.css';
import Header from "components/Header/Header";
import Fuse from "fuse.js";

import { useState, useEffect, useContext} from 'react';
import { UserContext } from "data/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import SpecificDataPage from "components/SpecificDataPage/SpecificDataPage";
import { UnauthorizedPage } from 'Pages/UnauthorizedPage/UnauthorizedPage';
import { HOST } from 'config';

const User = props => {
    const navigate = useNavigate();
    const handleUserClick = login => {
        navigate(`/users/user/${login}`, {
            state: {
                login: login
            }
        });
    }
    const formattedBirth = props.birth_date ? props.birth_date.split('T')[0] : null;
    console.log(formattedBirth, props.birth_date)

    return (
        <tr>
            <th scope="row" onClick={() => handleUserClick(props.login)}>{props.login}</th>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{formattedBirth}</td>
            <td>{props.gender}</td>
        </tr>
    )
}

const UsersList = ({ stringFilter }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${HOST}/api/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',

        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.message || 'Something went wrong!');
                    })
                }
                return response.json()
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.log('settings error', error);
                setLoading(false);
                setError(error.message);
            })

    }, [stringFilter])

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{error}</p>
    }
    let users;
    const createUsers = data => {
        users = data.map(person =>
            <User key={person.id} id={person.id} name={person.name} gender={person.gender} birth_date={person.birth_date} email={person.email} address={person.address} login={person.login} />
        )
        return users;

    }

    if (stringFilter.length !== 0) {
        const options = { includeScore: true, threshold: 0.4, keys: ['name', 'email', 'login'] }
        const fuse = new Fuse(data, options);
        const filteredData = fuse.search(stringFilter).map(person => person.item);

        users = createUsers(filteredData);

    }
    else {
        users = createUsers(data);
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
    const url = `${HOST}/api/users/user/${login}`;
    const protectedFields = ['login'];
    const dateFields = ['birth_date'];
    const fields = [
        'login', 'name', 'gender', 'birth_date', 'email', 'address'
    ]
    const allowedRoles = ['admin'];
    return (
        <>
            <SpecificDataPage url={url} fields={fields} protectedFields={protectedFields} dateFields={dateFields} title={login} allowedRoles={allowedRoles} />
        </>
    )
}

export default UsersPage;