import React, { useContext } from "react";
import './RoomPageStyle.css';
import Header from "components/Header/Header";
import Fuse from "fuse.js";

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import SpecificDataPage from "components/SpecificDataPage/SpecificDataPage";

import { UserContext } from "data/UserContext";
import { UnauthorizedPage } from "Pages/UnauthorizedPage/UnauthorizedPage";
import { HOST } from "config";

const Room = props => {
    const navigate = useNavigate();

    const handleRoomClick = () => {
        navigate(`/rooms/room/${props.id}`, {
            state: {
                code: props.id
            }
            
        });
    }
    return (
        <tr>
            {/* <th scope="row"> </th> */}
            <td onClick={() => handleRoomClick(props.id)}>{props.id}</td>
            <td onClick={() => handleRoomClick(props.capacity)}>{props.capacity}</td>
            {/* <td>kokotina1</td> */}
            {/* <td>kokotina2</td> */}
            {/* <td>kokotina3</td> */}
            {/* <td>kokotina4</td> */}
        </tr>
    )
}

const RoomList = ({ stringFilter }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
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
    
        fetchData();
      }, [stringFilter]);
    
    if (!data || data.length === 0)
    {
        return "no rooms yet";
    }
    if (loading) {
        return <p>Loading...</p>
    }
    let rooms;
    const createRooms = data => {
        rooms = data.map(room =>
            <Room key={room.ROOM_ID} id={room.ROOM_ID} capacity={room.capacity} />
        )
        return rooms;

    }
    if (stringFilter.length !== 0) {
        const options = { includeScore: true, threshold: 0.4, keys: ['name', 'code', 'guarantee_name'] }
        const fuse = new Fuse(data, options);
        const filteredData = fuse.search(stringFilter).map(room => room.item);

        rooms = createRooms(filteredData);
    }
    else {
        console.log(data, 'toto su data', data[0].ROOM_ID);
        rooms = createRooms(data);
    }
    return (
        <table className="table table-striped table-bordered">
            <thead className="table-dark">
                <tr>
                    <th scope="col">Room ID</th>
                    <th scope="col">Capacity</th>
                </tr>
            </thead>
            <tbody>
                {rooms}
            </tbody>
        </table>
    )

}

const RoomsFilter = (props) => {
    const handleStringFilterChange = event => {
        props.filterChangeCallback(event.target.value);
    }
    return (
        <div className="navbar-container">
            <label htmlFor="room-search">Room</label>
            <input type="search" name="room-search" id="room-search" placeholder="Search Room" aria-label="Search Room" onChange={handleStringFilterChange} />
        </div>
    )
}

const RoomsPage = () => {
    const {user} = useContext(UserContext);
    const [stringFilter, setStringFilter] = useState("");
    const filterChangeCallback = newValue => {
        setStringFilter(newValue);
    }
    return user.role === 'admin' || user.role === 'scheduler' ? (
        <>
            <Header />
            <div className='rooms-container'>
                <RoomsFilter filterChangeCallback={filterChangeCallback} />
                <RoomList stringFilter={stringFilter} />
            </div>
        </>
    ): <UnauthorizedPage />
}

export const RoomPage = () => {
    const { room } = useParams();

    const url = `${HOST}/api/rooms/room/${room}`;
    const protectedFields = ['ROOM_ID'];
    const aliases = ['id', 'capacity'];
    const fields = [
        'ROOM_ID', 'capacity'
    ]
    const allowedRoles = ['admin', 'teacher', 'scheduler'];
    return (
        <>
            <Header />
            <SpecificDataPage url={url} fields={fields} protectedFields={protectedFields} aliases={aliases} title={Room} allowedRoles={allowedRoles}/>
        </>
    )
}

export default RoomsPage;