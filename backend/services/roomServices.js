const getAllRooms = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM room', (err, result) => {
            if (err) { reject(err); }
		else resolve(result);
        })
    })
}

const createRoom = (conn, data) => {
    return new Promise((resolve, reject) => {
        conn.query("INSERT INTO room (ROOM_ID, capacity) VALUES (?, ?)", [data.id, data.capacity], (err, result) => {
            if (err) { reject(err); }
		else resolve(result);
        }
        )
    })
}

const getRoom = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM room WHERE ROOM_ID = ?", [id], (err, result) => {
            if (err) { 
		    reject(err); 
	    }
		else {
			resolve(result.length ? result[0] : null);
		}

	})})}

const updateRoom = (conn, data) => {
    return new Promise((resolve, reject) => {
        conn.query("UPDATE room SET capacity = ? WHERE ROOM_ID = ?", [data.capacity, data.id], (err, result) => {
            if (err) { reject(err); }
		else resolve(result);
        }
        )
    }
    )
}

const deleteRoom = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query("DELETE FROM room WHERE ROOM_ID = ?", id, (err, result) => {
            if (err) { reject(err); }
		else resolve(result);
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
