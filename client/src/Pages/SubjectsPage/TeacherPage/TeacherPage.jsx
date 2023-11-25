import React, { useEffect, useState } from 'react';
import Header from "components/Header/Header";
import { useNavigate } from 'react-router-dom';
import { HOST } from 'config';



const Guarantees = ({ dataGuarantee }) => {

    const navigate = useNavigate();

    const handleGuaranteeClick = (SUBJECT_CODE) => {
        navigate(`/subjects/teacher-page/guarantee/${SUBJECT_CODE}`, {
            state: { 
                subject: SUBJECT_CODE 
            }
        });

    }
    if (dataGuarantee.length === 0) {
        return <p>isnt guarantee</p>
    }
    return (
        <ul>
            {dataGuarantee.map(subject => <li onClick={() => handleGuaranteeClick(subject.SUBJECT_CODE)} >{subject.SUBJECT_CODE} </li>)}
        </ul>
    )
}

const Teaches = ({ dataTeacher }) => {
    console.log(dataTeacher);
    if (dataTeacher.length === 0) {
        return <p>isnt teaching</p>
    }
    return (
        <ul>
            {dataTeacher.map(subject => <li>{subject.SUBJECT_CODE}</li>)}
        </ul>
    )
    // return <p>Teaches</p>
}


const TeacherPage = () => {

    const [loading, setLoading] = useState(true);
    const [submitMessage, setSubmitMessage] = useState(null);
    const [dataTeacher, setDataTeacher] = useState([]);
    const [dataGuarantee, setDataGuarantee] = useState([]);

    useEffect(() => {
        fetch(`${HOST}/api/subjects/teaches`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(async response => {
                if (!response.ok) {
                    const jsonData = await response.json();
                    throw new Error(jsonData.message || 'Something went wrong!');
                }
                return response.json();
            })
            .then(data => {
                setDataTeacher(data);
            })
            .catch(err => {
                setSubmitMessage(err.message);
            })
        fetch(`${HOST}/api/subjects/guarantees`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(async response => {
                if (!response.ok) {
                    const jsonData = await response.json();
                    throw new Error(jsonData.message || 'Something went wrong!');
                }
                return response.json();
            })
            .then(data => {
                setDataGuarantee(data);
            })
            .catch(err => {
                setSubmitMessage(err.message);
            })
            .finally(() => setLoading(false))

    }, []);

    console.log(submitMessage);

    if (loading) {
        return <>
            <Header />
            <h1>Loading...</h1>
        </>
    }
    else 
        return (
            <div>
                <Header />
                <div className="container">
                    <h1>Guarantees</h1>
                    <Guarantees dataGuarantee={dataGuarantee} />
                </div>
                <div className="container">
                    <h1>Teaches</h1>
                    <Teaches dataTeacher={dataTeacher} />
                </div>
            </div>
        );
}


export default TeacherPage;