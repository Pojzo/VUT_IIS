const getAllUsers = conn => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM User', (err, result, fields) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const getUser = (conn, login) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM User WHERE login = ?', [login], (err, result, fields) => {
            if (err) reject(err);
            resolve(result[0]);
        })
    })
}

const userExist = (conn, login, email) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM User WHERE login = ? OR email = ?', [login, email], (err, result, fields) => {
            if (err) reject(err);
            resolve(result.length > 0);
        })
    })
}

const storeUser = (conn, sessionId, userType) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO session_table (session_id, user_type, created_at) VALUES(?, ?, ?)', [sessionId, userType, new Date()], (err, result, fields) => {
            if (err) reject(err);
            resolve()
        })
    })
}

const sessionIdExists = (conn, sessionId) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM session_table WHERE session_id = ?', [sessionId], (err, result, fields) => {
            if (err) reject(err);
            resolve(result.length > 0);
        })
    })
}


export default {
    getAllUsers,
    getUser,
    userExist,
    storeUser,
    sessionIdExists
}