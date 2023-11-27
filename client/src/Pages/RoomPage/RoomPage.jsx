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
import useFetchRooms from "hooks/roomHooks";

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
    const {rooms, roomsLoading, roomsError} = useFetchRooms();


    if (!rooms || rooms.length === 0)
    {
        return "no rooms yet";
    }
    if (roomsLoading) {
        return <p>roomsLoading...</p>
    }

    let filteredRooms;
    const createRooms = rooms => {
        rooms = rooms.map(room =>
            <Room key={room.ROOM_ID} id={room.ROOM_ID} capacity={room.capacity} />
        )
        return rooms;

    }
    if (stringFilter.length !== 0) {
        const options = { includeScore: true, threshold: 0.4, keys: ['name', 'code', 'guarantee_name'] }
        const fuse = new Fuse(rooms, options);
        const filteredrooms = fuse.search(stringFilter).map(room => room.item);

        filteredRooms = createRooms(filteredrooms);
    }
    else {
        console.log(rooms, 'toto su rooms', rooms[0].ROOM_ID);
        filteredRooms = createRooms(rooms);
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
                {filteredRooms}
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
            <SpecificDataPage url={url} fields={fields} protectedFields={protectedFields} aliases={aliases} title={Room} allowedRoles={allowedRoles}/>
        </>
    )
}

export default RoomsPage;
