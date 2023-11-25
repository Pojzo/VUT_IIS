import React from "react";
import './CreateRoomPageStyle.css';
import CreatePage from "components/CreatePage/CreatePage";
import { HOST } from "config";

const CreateRoomPage = () => {
    const url = `${HOST}/api/rooms/create-room`;
    const allowedRoles = ['admin'];
    const fields = [
        {
            name: 'id',
            label: 'ID',
            required: true
        },
        {
            name: 'capacity',
            label: 'Capacity',
            required: true
        }
    ]
    return (
        <>
            <CreatePage fields={fields} url={url} allowedRoles={allowedRoles} />
        </>
    )
}

export default CreateRoomPage;