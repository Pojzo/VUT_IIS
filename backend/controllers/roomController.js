import conn from "../config/db.js";
import roomServices from "../services/roomServices.js";

const getAllRooms = (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send(DB_NOT_CONNECTED.message);
    }
    roomServices.getAllRooms(conn).then(result => {
        res.send(result);
    })
        .catch(err => {
            res.send(err);
        })
}

const createRoom = (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send(DB_NOT_CONNECTED.message);
    }
    const data = {
        id: req.body.id,
        capacity: req.body.capacity,
    }
    roomServices.createRoom(conn, data).then(result => {
        res.send(result);
    })
        .catch(err => {
            res.send(err);
        })
}

const getRoom = (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }
    roomServices.getRoom(conn, req.params.room).then(result => {
        if (room === null) {
            const error = new Error("Room not found");
            error.code = 404;
            throw error;
        }
        res.send(result);
    })
        .catch(err => {
            if (err.statsu) {
                return res.status(err.status).send({ message: err.message });
            }
            console.error(err);
        })
}

const updateRoom = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send(DB_NOT_CONNECTED.message);
    }
    const room = await roomServices.getRoom(conn, req.params.room);
    if (!room) {
        return res.status(ROOM_NOT_FOUND.code).send(ROOM_NOT_FOUND.message);
    }
    try {
        const data = {
            id: req.body.ROOM_ID,
            capacity: req.body.capacity,
        }
        roomServices.updateRoom(conn, data).then(result => {
            res.send({ message: 'updated room' });
        })
            .catch(err => {
                res.send({ message: err.message });
            })

    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR.code).send(INTERNAL_SERVER_ERROR.message);
    }

}

const deleteRoom = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send(DB_NOT_CONNECTED.message);
    }
    const room = await roomServices.getRoom(conn, req.params.room);
    if (!room) {
        return res.status(ROOM_NOT_FOUND.code).send(ROOM_NOT_FOUND.message);
    }
    try {
        roomServices.deleteRoom(conn, room.ROOM_ID).then(result => {
        })
            .catch(err => {
                res.send({ message: err.message });
            })
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR.code).send(INTERNAL_SERVER_ERROR.message);
    }
}



export default {
    getAllRooms,
    createRoom,
    getRoom,
    updateRoom,
    deleteRoom,
}