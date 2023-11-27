import React, {useEffect, useState} from 'react';
import Header from "components/Header/Header";
import { useParams } from 'react-router-dom';
import './GuaranteePageStyles.css';
import { HOST } from 'config';

export const GuaranteePage = (state) => {
    const {subject }= useParams();


    const [submitMessage, setSubmitMessage] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false); // TODO zmenit na [reload, setReload
    const [status, setStatus] = useState(null); // TODO zmenit na [status, setStatus    
    const [error, setError] = useState(null);
    // const [showTheThing, setShowTheThing] = useState(false);

    const handleAddButtonClick = () => {
        const input = document.getElementById('add-subject-input');
        const loginValue = input.value;
        fetch(`${HOST}/api/subjects/add-teacher`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ 
                login: loginValue,
                subject: subject
            })
        })
            .then(async response => {
                reload ? setReload(false) : setReload(true);
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


    const handleDelete = (login) => {
        fetch(`${HOST}/api/subjects/delete-teacher`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ 
                login: login,
                subject: subject
            })
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
            .then(() => {
                reload ? setReload(false) : setReload(true);
            })
            .catch(err => {
                setSubmitMessage(err.message);
            })
    }

    useEffect(() => {
        fetch(`${HOST}/api/subjects/teachers/${subject}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then(response => {
            setLoading(false);
            if (!response.ok) {
                console.log('error', response);
                throw new Error('Something went wrong!');
            }
            return response.json();
        })
        .then(data => {
            setTeacher(data);
            setLoading(false);
        })
        .catch(err => {
            setError(err.message);
        });
    }, [subject, reload]);


    if (loading)// TODO zmenit 
        return(
            <div>
                <Header/>
                <h1>Loading...</h1>
            </div>
        )

    // else if (error) // TODO zmenit
    //     return (
    //         <div>
    //             <Header/>
    //             <h1>{error}</h1>
    //         </div>
    //     )

    const handleHover = (id) => {
        const element = document.getElementById(id);
        element.style.display = 'block';
    }
    const handleHoverOut = (id) => {
        const element = document.getElementById(id);
        element.style.display = 'none';
    }

    const handleSubmitForm = event => {
        console.log('submitting form', event)
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        data.append('SUBJECT_CODE', subject);
        const jsonData = JSON.stringify(Object.fromEntries(data));
        console.log('json data', jsonData);

        fetch(`${HOST}/api/activities/create-activity-request`, {
            method: 'POST',
            body: jsonData,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then(async response => {
            console.log('response', response);
            if (!response.ok) {
                console.log('error', response)
                const jsonData = await response.json();
                throw new Error(jsonData.message || 'Something went wrong!');
            }
            return response.json();
        })
        .then(data => {
            setStatus(data);
            setError(null);
        })
        .catch(error => {
            setError(error.message);
            setStatus(null);
        })

    }

    const Types = () => {
        // dropdown menu for input type 'lecture', 'seminar', 'lab', 'exam', 'other'
        // with one default value
        return (
            <div className="form-group">
                <label htmlFor="Type">Activity Type</label>
                <select name="Type" id="Type" className="form-control">
                    <option value="lecture">Lecture</option>
                    <option value="seminar">Seminar</option>
                    <option value="lab">Lab</option>
                    <option value="exam">Exam</option>
                    <option value="other">Other</option>
                </select>
            </div>
        )
    }

    const Frequency = () => {
        //dropdown menu for one time, weekly, biweekly,every three weeks and monthly 
        // one time is 0, weekly is 1, biweekly is 2, every three weeks is 3 and monthly is 4
        return (
            <div className="form-group">
                <label htmlFor="Frequency">Frequency</label>
                <select name="Frequency" id="Frequency" className="form-control">
                    <option value="0">One Time</option>
                    <option value="1">Weekly</option>
                    <option value="2">Biweekly</option>
                    <option value="3">Every Three Weeks</option>
                    <option value="4">Monthly</option>
                </select>
            </div>
        )

    }

    const DaysFree = () => {
        //for each day of week one start hour and one end hour which are small squares with arrow up and down
        // only full hours are allowed no minutes 
        // and monday to friday
        // i need start and end hour each day
        return (
            <div className="form-group">
                <label htmlFor="DaysFree">Days Free</label>
                <div className="days-free-container">
                    <div className="day-free-container">
                        <p>Monday</p>
                        <div className="day-free">
                            <input type="number" min="8" max="22" name="MondayStart" id="MondayStart" className="day-free-start" placeholder="Start" />
                            <input type="number" min="8" max="22"name="MondayEnd" id="MondayEnd" className="day-free-end" placeholder="End" />
                        </div>
                    </div>
                    <div className="day-free-container">
                        <p>Tuesday</p>
                        <div className="day-free">
                            <input type="number" min="8" max="22" name="TuesdayStart" id="TuesdayStart" className="day-free-start" placeholder="Start" />
                            <input type="number" min="8" max="22" name="TuesdayEnd" id="TuesdayEnd" className="day-free-end" placeholder="End" />
                        </div>
                    </div>
                    <div className="day-free-container">
                        <p>Wednesday</p>
                        <div className="day-free">
                            <input type="number" min="8" max="22"  name="WednesdayStart" id="WednesdayStart" className="day-free-start" placeholder="Start" />
                            <input type="number" min="8" max="22"  name="WednesdayEnd" id="WednesdayEnd" className="day-free-end" placeholder="End" />
                        </div>
                    </div>
                    <div className="day-free-container">
                        <p>Thursday</p>
                        <div className="day-free">
                            <input type="number" min="8" max="22" name="ThursdayStart" id="ThursdayStart" className="day-free-start" placeholder="Start" />
                            <input type="number" min="8" max="22" name="ThursdayEnd" id="ThursdayEnd" className="day-free-end" placeholder="End" />
                        </div>
                    </div>
                    <div className="day-free-container">
                        <p>Friday</p>
                        <div className="day-free">
                            <input type="number" min="8" max="22" name="FridayStart" id="FridayStart" className="day-free-start" placeholder="Start" />
                            <input type="number" min="8" max="22" name="FridayEnd" id="FridayEnd" className="day-free-end" placeholder="End" />
                        </div>
                    </div>
                </div>
            </div>
        )

    }



    const ActivityForm = () => {
        return (
            <div className="create-container">
                <h1>Create Activity Request</h1>
                <form action="" method="post" onSubmit={handleSubmitForm} id="create-form">
                    <Types />
                    {/* <div className="form-group">
                        <label htmlFor="Type">Activity Type</label>
                        <input name="Type" type= id={field.name} className="form-control" placeholder={field.label} required={field.required ? true : false} />
                    </div> */}
                    <div className="form-group">
                        {/* duration can only be number */}
                        <label htmlFor="Duration">Duration</label>
                        <input name="Duration" type="number" min="0"  id="Duration" className="form-control" placeholder="Duration" required />
                    </div>
                    {/* number of people expected */}
                    <div className="form-group">
                        <label htmlFor="Capacity">Capacity</label>
                        <input name="Capacity" type="number" min="0" id="Capacity" className="form-control" placeholder="Capacity" required />
                    </div>
                    {/* date start */}
                    <div className="form-group">
                        <label htmlFor="DateStart">Date Start</label>
                        <input name="DateStart" type="date" id="DateStart" className="form-control" placeholder="Date Start" required />
                    </div>
                    {/* date end */}
                    <div className="form-group">
                        <label htmlFor="DateEnd">Date End</label>
                        <input name="DateEnd" type="date" id="DateEnd" className="form-control" placeholder="Date End" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="teacher">Teacher</label>
                        <input name="teacher" type="text" id="teacher_login" className="form-control" placeholder="Teacher login" required />
                    </div>
                    <Frequency />
                    <DaysFree />
                    <div className="form-group">
                        {/* text field named comment */}
                        <label htmlFor="Comment">Comment</label>
                        <textarea name="Comment" id="Comment" className="form-control" placeholder="Comment" />
                    </div>
                    <button type="submit" className="create-user-button btn btn-success btn-lg ">Create</button>
                </form>
            </div>
        )
    }


    console.log('teacher', teacher)


    const showTheThing = (() => {
        if (teacher === null) return false;
        if (teacher.length === 0) return false;
        return true;
    })()

    
    if (!showTheThing)
    {
        return (
            <div>
                <Header />
                <div className="my-subjects-container width-container">
                    <input type="text" name="Teacher" placeholder="Add Teacher to course" id="add-subject-input" />
                    <button className="btn btn-primary" onClick={handleAddButtonClick}>Add</button>
                    {submitMessage && <p>{submitMessage}</p>}
                    <p>No teachers</p>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className=''>
                <Header />
                <div className="guarantee-subject-page">
                <div className="my-subjects-container">
                    <input type="text" name="Teacher" placeholder="Add Teacher to course" id="add-subject-input" />
                    <button className="btn btn-primary" onClick={handleAddButtonClick}>Add</button>
                    {submitMessage && <p>{submitMessage}</p>}
                    {<ul>
                        {teacher.message && teacher.message.map(teacher => {
                            const btnId = `my-teacher-btn-${teacher.login}`;
                            return (
                                <div className="my-subject-container" onMouseEnter={() => handleHover(btnId)} onMouseLeave={() => handleHoverOut(btnId)}>
                                    <li> {teacher.login} </li>
                                    <button className="btn btn-danger" id={btnId} style={{ display: "none" }} onClick={() => handleDelete(teacher.login)}></button>
                                </div>
                            )
                        })}
                    </ul>}
                </div>
                <ActivityForm />
                {/* <p>{status}</p> */}
                <div className="my-subjects-container height-container">
                    <p>{status && status.message}</p>
                    <p>{error && error}</p> 
                </div>
            </div>
            </div>
        )
    }
}
