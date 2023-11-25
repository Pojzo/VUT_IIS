import React, { useEffect } from "react";
import Header from "components/Header/Header";
import './MySubjectsPageStyles.css';
import { useState } from "react";
import { HOST } from "config";

const MySubjectsPage = () => {
    const [loading, setLoading] = useState(true);
    const [submitMessage, setSubmitMessage] = useState(null);
    const [subjects, setSubjects] = useState(null);

    const handleDelete = (code) => {
        fetch(`${HOST}/api/subjects/user-delete-subject`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ SUBJECT_CODE: code })
        })
        .then(async response => {
            if (!response.ok) {
                console.log('error', response)
                const jsonData = await response.json();
                throw new Error(jsonData.message || 'Something went wrong!');
            }
            return response.json();
        })
        .then(data => {
            setSubmitMessage(data.message);
        })
        .catch(err => {
            setSubmitMessage(err.message);
        })
    }

    const handleAddButtonClick = () => {
        const input = document.getElementById('add-subject-input');
        const codeValue = input.value;
        fetch(`${HOST}/api/subjects/user-add-subject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ SUBJECT_CODE: codeValue })
        })
            .then(async response => {
                if (!response.ok) {
                    console.log('error', response)
                    const jsonData = await response.json();
                    throw new Error(jsonData.message || 'Something went wrong!');
                }
                return response.json();
            })
            .then(data => {
                setSubmitMessage(data.message);
            })
            .catch(err => {
                setSubmitMessage(err.message);
            })
    }

    useEffect(() => {
        setLoading(true);
        console.log('fetching my subjects');
        fetch(`${HOST}/api/subjects/my-subjects`, {
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
                setSubjects(data);
                console.log(data)
                setSubmitMessage(null);
            })
            .catch(err => {
                console.log(err.message)
                setSubmitMessage(err.message);
            })
            .finally(() => {
                setLoading(false)
            })

    }, [submitMessage])
    if (loading) {
        return <>
            <Header></Header>
            <h1>Loading</h1>
        </>
    }
    const handleHover = (id) => {
        const element = document.getElementById(id);
        element.style.display = 'block';
    }
    const handleHoverOut = (id) => {
        const element = document.getElementById(id);
        element.style.display = 'none';
    }
    return (
        <>
            <Header></Header>
            <div className="width-container my-subjects-container">
                <input type="text" name="Subject" placeholder="Add subject" id="add-subject-input" />
                <button className="btn btn-primary" onClick={handleAddButtonClick}>Add</button>
                {submitMessage && <p>{submitMessage}</p>}
                {<ul>
                    {subjects && subjects.map(subject => {
                        const btnId = `my-subject-btn-${subject.SUBJECT_CODE}`;
                        return (
                            <div className="my-subject-container" onMouseEnter={() => handleHover(btnId)} onMouseLeave={() => handleHoverOut(btnId)}>
                                <li> {subject.SUBJECT_CODE} </li>
                                <button className="btn btn-danger" id={btnId} style={{ display: "none" }} onClick={() => handleDelete(subject.SUBJECT_CODE)}></button>
                            </div>
                        )
                    })}
                </ul>}
            </div>
        </>
    )
}

export default MySubjectsPage;