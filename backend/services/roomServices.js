const getAllRooms = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM room', (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    })
}

const createRoom = (conn, data) => {
    return new Promise((resolve, reject) => {
        conn.query("INSERT INTO Room (ROOM_ID, capacity) VALUES (?, ?)", [data.id, data.capacity], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        }
        )
    })
}

const getRoom = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM Room WHERE ROOM_ID = ?", [id], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result.length ? result[0] : null);
        }
        )
    })
}

const updateRoom = (conn, data) => {
    return new Promise((resolve, reject) => {
        conn.query("UPDATE Room SET capacity = ? WHERE ROOM_ID = ?", [data.capacity, data.id], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        }
        )
    }
    )
}

const deleteRoom = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query("DELETE FROM Room WHERE ROOM_ID = ?", id, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        }
        )
    }
    )
}



export default {
    getAllRooms,
    createRoom,
    getRoom,
    updateRoom,
    deleteRoom,
}