import { forwardRef, useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "data/UserContext";
import Header from "components/Header/Header";
import { HOST } from "config";
import { UnauthorizedPage } from "Pages/UnauthorizedPage/UnauthorizedPage";

const setSubjectCode = (formData, setFormData, e) => {
    setFormData({...formData, SUBJECT_CODE: e.target.value});
}

const setActivityType = (formData, setFormData, e) => {
    setFormData({...formData, type: e.target.value});
}

const setDuration = (formData, setFormData, e) => {
    console.log(e.target.value)
    setFormData({...formData, duration: e.target.value? e.target.value : 1});
}

const setFrequency = (formData, setFormData, e) => {
    setFormData({...formData, frequency: parseInt(e.target.value)});
}

const setStartDate = (formData, setFormData, e) => {
    setFormData({...formData, start_date: e.target.value});
}

const setEndDate = (formData, setFormData, e) => {
    setFormData({...formData, end_date: e.target.value});
}

const setRoom = (formData, setFormData, e) => {
    setFormData({...formData, room_id: e.target.value});
}

const CreateRegularActivity = forwardRef(({formData, setFormData}, ref) => {

    const subject = formData.SUBJECT_CODE;
    const type = formData.type;
    const duration = formData.duration;
    const frequency = formData.frequency;
    const startDate = formData.start_date;
    const endDate = formData.end_date;
    console.log('formData', formData)
    const room = formData.room_id;

    return (
        <form ref={ref}>
            <div className="form-group regular-activity-form">
                <label htmlFor="subject-code">Subject</label>
                <input type="text" className="form-control" id="subject-code" name="SUBJECT_CODE" placeholder="Enter subject code" required onChange={e => setSubjectCode(formData, setFormData, e)} defaultValue={subject}/>
                <small className="form-text text-muted">e.g. IPK, ISA</small>
            </div>
            <div className="form-group">
                <label htmlFor="activity-type">Activity type</label>
                <select className="form-control" id="activity-type" onChange={e => setActivityType(formData, setFormData, e)} defaultValue={type}>
                    <option disabled selected value>Select type</option>
                    <option>lecture</option>
                    <option>seminar</option>
                    <option>lab</option>
                    <option>exam</option>
                    <option>other</option>
                </select>
            </div>
            <label htmlFor="activity-duration">Duration</label>
            <select className="form-control" id="activity-duration" required onChange={e => setDuration(formData, setFormData, e)} defaultValue={duration}>
                <option>1 hours</option>
                <option>2 hours</option>
                <option>3 hours</option>
                <option>4 hours</option>
            </select>

            <div className="form-group">
                <label htmlFor="activity-frequency">Frequency</label>
                <input className="form-control" type="number" name="frequency" id="activity-frequency" min={1} max={3} defaultValue={frequency} onChange={e => setFrequency(formData, setFormData, e)} />
            </div>
            <div className="form-group">
                <label htmlFor="activity-room">Room</label>
                <input className="form-control" type="text" name="room_id" id="activity-room" onChange={e => setRoom(formData, setFormData, e)} defaultValue={room}required />
            </div>
            <div className="form-group">
                <label htmlFor="activity-start-date">Start date + time</label>
                <input className="form-control" type="datetime-local" name="start_date" id="activity-start-date" defaultValue={startDate} onChange={e => setStartDate(formData, setFormData, e)} />
            </div>
            <div className="form-group">
                <label htmlFor="activity-end-date">End date</label>
                <input className="form-control" type="date" name="end_date" id="activity-end-date" defaultValue={endDate} onChange={e => setEndDate(formData, setFormData, e)} />
            </div>
        </form>
    )
})

const CreateOneTimeActivity = forwardRef(({formData, setFormData}, ref) => {
    const subject = formData.SUBJECT_CODE;
    const type = formData.type;
    const duration = formData.duration;
    const room = formData.room_id;
    const startDate = formData.start_date;
    const endDate = formData.end_date;

    return (
        <form ref={ref}>
            <div className="form-group one-time-activity-form">
                <label htmlFor="subject-code">Subject</label>
                <input type="text" className="form-control" id="subject-code" placeholder="Enter subject code" required defaultValue={subject} onChange={(e => setSubjectCode(formData, setFormData, e))}/>
                <small className="form-text text-muted">e.g. IPK, ISA</small>
            </div>
            <div className="form-group">
                <label htmlFor="activity-type">Activity type</label>
                <select className="form-control" id="activity-type" required defaultValue={type} onChange={e => setActivityType(formData, setFormData, e)}>
                    <option disabled selected value>Select type</option>
                    <option>lecture</option>
                    <option>seminar</option>
                    <option>lab</option>
                    <option>exam</option>
                    <option>other</option>
                </select>
            </div>
            <label htmlFor="activity-duration">Duration</label>
            <select className="form-control" id="activity-duration" required defaultValue={duration} onChange={e => setDuration(formData, setFormData, e)}>
                <option>1 hours</option>
                <option>2 hours</option>
                <option>3 hours</option>
                <option>4 hours</option>
            </select>
 <div className="form-group">
                <label htmlFor="activity-room">Room</label>
                <input className="form-control" type="text" name="room_id" id="activity-room" onChange={e => setRoom(formData, setFormData, e)} defaultValue={room}required/>
            </div>

            <div className="form-group">
                <label htmlFor="activity-start-date">Start date + time</label>
                <input className="form-control" type="datetime-local" name="start_date" id="activity-start-date" defaultValue={startDate} onChange={e => setStartDate(formData, setFormData, e)} />
            </div>
            <div className="form-group">
                <label htmlFor="activity-end-date">End date</label>
                <input className="form-control" type="date" name="end_date" id="activity-end-date" defaultValue={endDate} onChange={e => setEndDate(formData, setFormData, e)} />
            </div>
        </form>
    )
})

export const CreateActivityPage = () => {
    const { user } = useContext(UserContext);
    const [checked, setChecked] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(null);
    const [error, setError] = useState(null);

    const regularFormRef = useRef(null);
    const oneTimeFormRef = useRef(null);

    const dateToday = new Date().toISOString();
    const dateTodayWithoutTime = dateToday.split('T')[0];

    const [formData, setFormData] = useState({
        duration: '1 hours',
        frequency: 1,
        start_date: dateToday,
        end_date:   dateTodayWithoutTime,
        SUBJECT_CODE: '',
        type: 'lecture',
        room_id: ''
    });

    useEffect(() => {
        try {
        const checked = document.getElementById('flexSwitchCheckDefault').checked;
        setChecked(checked);
        }
        catch(err) {}
    }, [])

    const onSwitchChanged = event => {
        setChecked(event.target.checked)
    }

    const submit = one_time_activity => {
        console.log('submitting form', formData);
        const sendData = { ...formData}
        // add one hour to the start date
        sendData['duration'] = parseInt(sendData['duration'][0]);
        const hourPlusDate = new Date(sendData['start_date']);
        hourPlusDate.setHours(hourPlusDate.getHours() + 1);
        sendData['start_date'] = hourPlusDate.toISOString();
        fetch(`${HOST}/api/activities/create-activity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(sendData)
        })
            .then((async response => {
                if (!response.ok) {
                    if (response.status === 404) throw new Error('404 NOT FOUND')
                    const err = await response.json();
                    throw new Error(err.message);
                }
                return response.json();
            }))
            .then(data => {
                setSubmitMessage(data.message);
                setError(false);
            })
            .catch(err => {
                console.log(err)
                setSubmitMessage(err.message);
                setError(true);
            })
    }

    const submitForm = () => {
        const ref = checked ? oneTimeFormRef : regularFormRef;
        const formValid = ref.current.reportValidity();
        console.log('form is valid', formValid);
        if (!formValid) return;
        submit(checked);
    }

    return user.role === 'scheduler' ? (
        <>
            <Header />
            <div className="width-container">
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={onSwitchChanged} />
                    <label className="form-check-label" for="flexSwitchCheckDefault">One time activity</label>
                </div>
                <div className="">
                </div>
                {checked && <CreateOneTimeActivity formData={formData} setFormData={setFormData} ref={oneTimeFormRef} />}
                {!checked && <CreateRegularActivity formData={formData} setFormData={setFormData} ref={regularFormRef} />}

                <button type="btn" className="btn btn-info" onClick={submitForm}>Submit</button>
                {submitMessage && <h1 style={{
                    color: error ? 'red' : 'green'

                }}>{submitMessage}</h1>}
            </div>
        </>
    ) : 
    (<UnauthorizedPage/>)

}