import { HOST } from "config";
const { useState, useEffect } = require("react");

const useFetchActivities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
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
                    setActivities(activities);
                })
                .catch(err => {
                })
        }
        fetchActivities();
    }, [])

    return { activities, loading, error}
}

export default useFetchActivities;