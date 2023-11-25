import React from "react";
import './SubjectsPageStyle.css';
import Header from "components/Header/Header";
import Fuse from "fuse.js";

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import SpecificDataPage from "components/SpecificDataPage/SpecificDataPage";
import { HOST } from "config";

const Subject = props => {
    const navigate = useNavigate();

    const handleSubjectClick = () => {
        navigate(`/subjects/subject/${props.code}`, {
            state: {
                code: props.code
            }

        });
    }
    const handleUserClick = () => {
        navigate(`/users/user/${props.guarantee_login}`, {
            state: {
                login: props.guarantee_login
            }
        });
    }
    return (
        <tr>
            {/* <th scope="row"> </th> */}
            <td onClick={() => handleSubjectClick(props.code)}>{props.code}</td>
            <td onClick={() => handleSubjectClick(props.name)}>{props.name}</td>
            <td>{props.credits} </td>
            <td onClick={() => handleUserClick()}> {props.guarantee_name}</td>
            {/* <td>kokotina1</td> */}
            {/* <td>kokotina2</td> */}
            {/* <td>kokotina3</td> */}
            {/* <td>kokotina4</td> */}
        </tr>
    )
}

const SubjectList = ({ stringFilter }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await fetch(`${HOST}/api/subjects`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setData([]); // Set data to an appropriate default value in case of an error.
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [stringFilter]);

    if (!data || data.length === 0) {
        return "no subjects";
    }
    console.log(data);
    if (loading) {
        return <p>Loading...</p>
    }
    let subjects;
    const createSubjects = data => {
        subjects = data.map(subject =>
            <Subject key={subject.subject_code} code={subject.subject_code} name={subject.subject_name} credits={subject.subject_credits} guarantee_name={subject.guarantee_name ? subject.guarantee_name : 'null'} guarantee_login={subject.guarantee_login} />
        )
        return subjects;

    }
    if (stringFilter.length !== 0) {
        const options = { includeScore: true, threshold: 0.4, keys: ['name', 'code', 'guarantee_name'] }
        const fuse = new Fuse(data, options);
        const filteredData = fuse.search(stringFilter).map(subject => subject.item);

        subjects = createSubjects(filteredData);
    }
    else {
        console.log(data, 'toto su data');
        subjects = createSubjects(data);
    }
    console.log(subjects);
    return (
        <table className="table table-striped table-bordered">
            <thead className="table-dark">
                <tr>
                    <th scope="col">code</th>
                    <th scope="col">name</th>
                    <th scope="col">credits</th>
                    <th scope="col">guarantee</th>
                </tr>
            </thead>
            <tbody>
                {subjects}
            </tbody>
        </table>
    )
}

const SubjectsFilter = (props) => {
    const handleStringFilterChange = event => {
        props.filterChangeCallback(event.target.value);
    }
    return (
        <div className="navbar-container">
            <label htmlFor="subject-search">Subject</label>
            <input type="search" name="subject-search" id="subject-search" placeholder="Search subject" aria-label="Search subject" onChange={handleStringFilterChange} />
        </div>
    )
}

const SubjectsPage = () => {
    const [stringFilter, setStringFilter] = useState("");
    const filterChangeCallback = newValue => {
        setStringFilter(newValue);
    }
    return (
        <>
            <Header />
            <div className='subjects-container'>
                <SubjectsFilter filterChangeCallback={filterChangeCallback} />
                <SubjectList stringFilter={stringFilter} />
            </div>
        </>
    )
}

export const SubjectPage = () => {
    const { subject } = useParams();
    const url = `${HOST}/api/subjects/subject/${subject}`;
    const protectedFields = ['SUBJECT_CODE'];

    const aliases = ['code', 'name', 'credits', 'guarantee'];

    const fields = [
        'SUBJECT_CODE', 'name', 'credits', 'guarantee_login'
    ]
    const allowedRoles = ['admin'];
    return (
        <>
            <SpecificDataPage url={url} fields={fields} protectedFields={protectedFields} aliases={aliases} title={subject} allowedRoles={allowedRoles}/>
        </>
    )
}

export default SubjectsPage;