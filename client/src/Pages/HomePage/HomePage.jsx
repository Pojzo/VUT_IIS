import './HomePageStyles.css';

import { useEffect, useState } from 'react';
import Header from "../../components/Header/Header";
import { HOST } from 'config';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { act } from 'react-dom/test-utils';

// eslint-disable-next-line no-extend-native
Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    var dayOfYear = ((today - onejan + 86400000) / 86400000);
    return Math.ceil(dayOfYear / 7)
};

const LECTURE_COLOR = 'pink';
const SEMINAR_COLOR = 'lightblue';
const LAB_COLOR = 'lightgreen';
const EXAM_COLOR = 'lightyellow';
const OTHER_COLOR = 'gray';

const FilledCell = ({ data }) => {
    const color = (() => {
        if (data.type === 'lecture') {
            return LECTURE_COLOR;
        }
        if (data.type === 'seminar') {
            return SEMINAR_COLOR;
        }
        if (data.type === 'lab') {
            return LAB_COLOR;
        }
    })()

    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: color,
            display: 'flex',
            justifyContent: 'space-around'
        }}>
            <p style={{
                color: 'purple',
                fontWeight: 'bold'
            }}>{data.subject}</p>
            <p>{data.room}</p>
        </div>
    )
}

const CalendarCell = ({ data }) => {
    if (data.type === 'hour' || data.type === 'empty') {
        return <p>{data.value}</p>
    }
    if (data.type === 'day') {
        return <p>{data.value}</p>
    }
    if (data.type === 'lecture' || data.type === 'seminar' || data.type === 'lab') {
        return (<FilledCell data={data}></FilledCell>)
    }
}

const Calendar = (props) => {
    const [week, setWeek] = useState(new Date().getWeek());
    const [year, setYear] = useState(new Date().getFullYear());
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const hours = Array.from({ length: 24 }).map((_, i) => `${i}:00`).slice(8, 20);


    useEffect(() => {
        fetch(`${HOST}/api/activities/my-activities`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(async response => {
                setLoading(false);
                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.message || 'Something went wrong!');
                }
                return response.json();
            })
            .then(({ activities }) => {
                console.log(activities)
                setActivities(activities);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const weekValues = [...Array(52).keys()].map((_, i) => i + 1);
    const yearValues = [...Array(10).keys()].map((_, i) => i + 2023);

    const formatDate = (week, year) => {
        const DAY_IN_MS = 24 * 60 * 60 * 1000; // Milliseconds in a day
        const HALF_DAY_IN_MS = 12 * 60 * 60 * 1000; // Milliseconds in half a day

        // Get the first day of the year
        let firstDayOfYear = new Date(year, 0, 1);

        // Calculate the offset to the first Monday of the year
        const dayOfWeek = firstDayOfYear.getDay();
        const offset = (dayOfWeek > 1 ? 8 - dayOfWeek : 1) - 1;
        firstDayOfYear.setDate(firstDayOfYear.getDate() + offset);

        // Calculate start date of the given week
        const startDate = new Date(firstDayOfYear.getTime() + (week - 1) * 7 * DAY_IN_MS + HALF_DAY_IN_MS);

        // Calculate end date of the given week
        const endDate = new Date(startDate.getTime() + 5 * DAY_IN_MS + HALF_DAY_IN_MS);

        return `${startDate.getDate()}.${startDate.getMonth() + 1} - ${endDate.getDate()}.${endDate.getMonth() + 1} : ${year}`;
    }

    //create array of arrays of empty objects  so [5][12]
    const data = Array.from({ length: 6 }).map((_, i) => Array(Array.from({ length: 13 }).map((_, i) => { return { type: 'empty' } })));
    data[0][0] = Array.from({ length: 13 }).map((_, i) => { return { type: 'hour', value: (i + 7) + ':00' } });
    data[0][0][0] = { type: 'empty' };
    data[1][0][0] = { type: 'day', value: 'Monday' };
    data[2][0][0] = { type: 'day', value: 'Tuesday' };
    data[3][0][0] = { type: 'day', value: 'Wednesday' };
    data[4][0][0] = { type: 'day', value: 'Thursday' };
    data[5][0][0] = { type: 'day', value: 'Friday' };


    // data[1][0][1] = { type: 'lecture', room: 'D206', subject: 'IMA' }
    // data[1][0][2] = { type: 'lecture', room: 'D206', subject: 'IMA' }

    // data[1][1] = Array.from({ length: 13 }).map((_, i) => { return { type: 'empty' } });

    // data[1][1][2] = { type: 'lab', room: 'D206', subject: 'IDS' }
    // data[1][1][3] = { type: 'lab', room: 'D206', subject: 'IDS' }

    // data[2][0][5] = { type: 'seminar', room: 'D105', subject: 'IPK' }
    // data[2][0][6] = { type: 'seminar', room: 'D105', subject: 'IPK' }
    // data[2][0][7] = { type: 'seminar', room: 'D105', subject: 'IPK' }

    // data[4][0][2] = { type: 'lab', room: 'B150', subject: 'IMP' }
    // data[4][0][3] = { type: 'lab', room: 'B150', subject: 'IMP' }
    // data[4][0][4] = { type: 'lab', room: 'B150', subject: 'IMP' }
    // data[4][0][5] = { type: 'lab', room: 'B150', subject: 'IMP' }

    const getActivitiesForCurrentWeek = () => {
        return activities.filter(activity => {
            const endDate = activity.end_date;

            const startTimestamp = new Date(activity.start_date).getTime();
            const endTimestamp = new Date(endDate).getTime();

            const startDays = (1 + (week - 1) * 7);
            const endDays = startDays + 5;

            const currentStartWeekTimestamp = new Date(year, 0, startDays, 1).getTime();
            const currentEndWeekTimestamp = new Date(year, 0, endDays, 24).getTime();
            if (endTimestamp < currentEndWeekTimestamp) {
                return false;
            }

            if (startTimestamp > currentEndWeekTimestamp) {
                return false;
            }
            return true;

        })
    }

    const getDayFromDate = (date) => {
        return new Date(date).getDay();
    }

    const currentWeekActivities = getActivitiesForCurrentWeek();

    const checkCollision = (activity) => {
        const day = getDayFromDate(activity.start_date);
        const startHour = new Date(activity.start_date).getHours();
        const duration = activity.duration;
        for (let i = 0; i < data[day].length; i++) {
            const curRow = data[day][i];
            for (let j = startHour; j < startHour + duration; j++) {
                const index = j - 7;
                if (index < 0) return false;
                const cell = curRow[index];
                console.log(index)
                if (cell.type !== 'empty') {
                    return true;
                }
            }
        }
        return false;
    }


    for (const activity of currentWeekActivities) {
        const day = getDayFromDate(activity.start_date);
        const startHour = new Date(activity.start_date).getHours();
        const duration = activity.duration;
        const roomId = activity.room_id;
        const subject = activity.SUBJECT_CODE;
        const obj = {
            type: activity.type,
            room: roomId,
            subject: subject
        }
        const collision = checkCollision(activity);
        console.log(collision, 'kolizia', subject, roomId)
        if (!collision) {
            for (let i = startHour; i < startHour + duration; i++) {
                data[day][0][i - 7] = obj;
            }
        }
        else {
            const emptyArray = Array.from({ length: 13 }).map((_, i) => { return { type: 'empty' } });
            for (let i = startHour; i < startHour + duration; i++) {
                const index = i - 7;
                console.log(index, 'index')
                emptyArray[index] = obj;
            }
            data[day].push(emptyArray);
        }
    }

    const legendData = [
        { type: 'lecture', color: LECTURE_COLOR, name: 'Lecture' },
        { type: 'seminar', color: SEMINAR_COLOR, name: 'Seminar' },
        { type: 'lab', color: LAB_COLOR, name: 'Lab' },
        { type: 'exam', color: EXAM_COLOR, name: 'Exam' },
        { type: 'other', color: OTHER_COLOR, name: 'Other' },
    ]

    return (
        <>
            <div className="date-selector-container">
                <label htmlFor="week-picker">Select week</label>

                <div className="week-picker-container">
                    <select className="form-select" name="week-picker" id="week-picker" defaultValue={week} onChange={e => setWeek(e.target.value)}>
                        {weekValues.map(i => <option value={i}>{i}</option>)}
                    </select>
                    <button className="btn btn-danger" onClick={
                        () => {
                            const element = document.getElementById('week-picker');
                            const newValue = parseInt(element.value) === 1 ? 52 : parseInt(element.value) - 1;
                            setWeek(newValue)
                            element.value = newValue;
                        }
                    }>-</button>
                    <button className="btn btn-success" onClick={
                        () => {
                            const element = document.getElementById('week-picker');
                            const newValue = parseInt(element.value) === 52 ? 1 : parseInt(element.value) + 1;
                            setWeek(newValue)
                            element.value = newValue;

                        }
                    }>+</button>
                </div>

                <label htmlFor="year-picker">Select year</label>
                <div className="year-picker-container">
                    <select className="form-select" name="year-picker" id="year-picker" defaultValue={year} onChange={e => setYear(parseInt(e.target.value))}>
                        {yearValues.map(i => <option value={i}>{i}</option>)}
                    </select>

                    <button className="btn btn-danger" onClick={
                        () => {
                            const element = document.getElementById('year-picker');
                            const newValue = parseInt(element.value) === 2023 ? 2032 : parseInt(element.value) - 1;
                            setYear(newValue)
                            element.value = newValue;
                        }
                    }>-</button>
                    <button className="btn btn-success" onClick={
                        () => {
                            const element = document.getElementById('year-picker');
                            const newValue = parseInt(element.value) === 2032 ? 2023 : parseInt(element.value) + 1;
                            setYear(newValue)
                            element.value = newValue;

                        }}>+</button>

                </div>

                <h3 style={{
                    marginTop: '1rem',
                    width: 300
                }}>{formatDate(week, year)}</h3>

            </div>

            <div className='calendar'>
                <div className="calendar-header">

                </div>
                <div className="calendar-body">
                    <div className="calendar-grid">
                        {/* flattern data array */}
                        {[...data.flat()].flat().map((element, i) => <div className="calendar-cell" key={i}>
                            <CalendarCell data={element} />
                        </div>)}
                    </div>
                </div>
            </div>
            <div className="legend-container">
                {legendData.map(legendItem => (
                    <div className="legend-item" key={legendItem.type}>
                        <p className="legend-name">{legendItem.name}</p>
                        <div className="legend-color" style={{ backgroundColor: legendItem.color }}></div>
                    </div>
                ))}
            </div>
        </>
    )

}

const HomePage = () => {
    return (
        <>
            <Header />
            <Calendar />
        </>
    )
}

export default HomePage;