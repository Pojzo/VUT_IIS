import Header from 'components/Header/Header';
import './ActivitiesPageStyles.css';
import React from 'react';
import { LECTURE_COLOR, SEMINAR_COLOR, LAB_COLOR, EXAM_COLOR, OTHER_COLOR } from 'Pages/HomePage/HomePage';
import { useState } from 'react';

import useFetchActivities from 'hooks/activityHooks';
import { HOST } from 'config';

const getColor = type => {
    if (type === 'lecture') {
        return LECTURE_COLOR;
    }
    if (type === 'seminar') {
        return SEMINAR_COLOR;
    }
    if (type === 'lab') {
        return LAB_COLOR;
    }
    if (type === 'exam') {
        return EXAM_COLOR;
    }
    return OTHER_COLOR;
}

const Activity = ({ activity, index }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submitMessage, setSubmitMessage] = useState(null);
    const type = activity.type;
    const color = getColor(type);


    const handleActivityDelete = (activityId) => {
        fetch(`${HOST}/api/activities/delete-activity/${activityId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then(async response => {
                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.message ? err.message : 'Something went wrong');
                }
                return response.json();
            })
            .then(data => {
                // refresh the page
                window.location.reload();
            })
            .catch(err => {
                alert(err.message)
            })
    }
    return (
        <div className="activity" style={{
            backgroundColor: color
        }}>
            <h1 style={{ textAlign: 'center' }}>Activity #{index}</h1>
            <ul>
                <li>subject: {activity.SUBJECT_CODE}</li>
                <li>room: {activity.room_id}</li>
                <li>teacher: {activity.login}</li>
                <li>type:  {activity.type}</li>
                <li>frequency: {
                    activity.frequency === 0 ? 'once' :
                        activity.frequency === 1 ? 'weekly' :
                            activity.frequency === 2 ? 'biweekly' :
                                activity.frequency === 3 ? 'every 3 weeks' :
                                    'monthly'
                }</li>
                <li>start date: {activity.start_date.split('T')[0]}</li>
                <li>end date: {activity.end_date.split('T')[0]}</li>
                <li>start hour: {activity.start_date.split('T')[1].slice(0, 2)}:00</li>
                <li>duration: {activity.duration}  hour{activity.duration > 1 ? 's' : ''}</li>
            </ul>
            <button className="btn btn-danger" style={{
                marginLeft: '100px',
                marginTop: '20px'
            }} onClick={() => handleActivityDelete(activity.ACTIVITY_ID)}>DELETE ACTIVITY</button>
        </div>
    )
}

const ActivitiesPage = () => {
    const { activities, loading, error } = useFetchActivities();
    console.log(activities)
    return (
        <>
            <Header />
            <div className="activities-page width-container">
                <div className="activities-list">
                    {activities.map((activity, i) => (
                        <Activity key={i} activity={activity} index={i} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default ActivitiesPage;