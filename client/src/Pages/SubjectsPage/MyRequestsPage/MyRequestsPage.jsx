import React from 'react';
import Header from "components/Header/Header";
import { HOST } from 'config';
import { useState, useEffect } from 'react';

const MyRequestsPage = () => {
    const [submitMessage, setSubmitMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);
    const [data, setData] = useState(null);


    useEffect(() => {
        fetch(`${HOST}/api/activities/my-activity-requests`, {
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
            setData(data);
            setLoading(false);
        })
        .catch(err => {
            setError(err.message);
        });
    }, [reload]);


    const frequencyStringMap = {
        0: 'Once',
        1: 'Weekly',
        2: 'Biweekly',
        3: 'Every three weeks',
        4: 'Monthly'
    }

    const Frequency = ({ frequency }) => {
        return <div>
            <p><strong>Frequency: </strong>{frequency in frequencyStringMap ? frequencyStringMap[frequency] : null}</p>
        </div>
    }


    const ActivityWindow = ({ activity }) => {
        return (
            <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '300px' }}>
                <h2>Activity #{activity.activity_request_id}</h2>
                <p><strong>Subject Code:</strong> {activity.SUBJECT_CODE}</p>
                <p><strong>Type:</strong> {activity.type}</p>
                <Frequency frequency={activity.frequency} />
                <p><strong>Duration:</strong> {activity.duration} hour(s)</p>
                <p><strong>Capacity:</strong> {activity.capacity}</p>
                <p><strong>Teacher:</strong> {activity.teacher_login}</p>
                <p><strong>Start Date:</strong> {new Date(activity.start_date).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(activity.end_date).toLocaleDateString()}</p>
                {(activity.monday_start || activity.monday_end) && <p><strong>Monday:</strong> {activity.monday_start} - {activity.monday_end}</p>}
                {(activity.tuesday_start || activity.tuesday_end) && <p><strong>Tuesday:</strong> {activity.tuesday_start} - {activity.tuesday_end}</p>}
                {(activity.wednesday_start || activity.wednesday_end) && <p><strong>Wednesday:</strong> {activity.wednesday_start} - {activity.wednesday_end}</p>}
                {(activity.thursday_start || activity.thursday_end) && <p><strong>Thursday:</strong> {activity.thursday_start} - {activity.thursday_end}</p>}
                {(activity.friday_start || activity.friday_end) && <p><strong>Friday:</strong> {activity.friday_start} - {activity.friday_end}</p>}
                {activity.comment && <p><strong>Comment:</strong> {activity.comment}</p>}
                {activity.additional_comment && <p><strong>Schedulers Comment:</strong> {activity.additional_comment}</p>}
                <h2>{activity.status}</h2>
            </div>
        );
    };

    const ActivityList = ({ activities }) => {
        return (
            <div className='width-container activity-list'>
                {activities
                    .map(activity => (
                    <ActivityWindow key={activity.activity_request_id} activity={activity} />
                    ))}
            </div>
        );
    };



    if (data === null) {
        return (
            <div>
                <Header />
                <p>There are no requests</p>
            </div>
        )
    }


    return data ? (
        <div>
            <Header />
            <ActivityList activities={data.msg} />
        </div>
    ) : (
        <div>
            <Header />
            <p>There are no requests</p>
        </div>
    )
}

export default MyRequestsPage;