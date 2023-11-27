import { useEffect, useState } from "react";
import { HOST } from "config";

const useFetchRooms = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {

        const fetchRooms = async () => {
            try {
                setLoading(true);

                const response = await fetch(`${HOST}/api/rooms`);
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
        fetchRooms();
    }, [])
    return { rooms: data, roomsLoading: loading, roomsError: error };
}

export default useFetchRooms;