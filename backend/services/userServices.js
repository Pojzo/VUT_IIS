const getAllUsers = conn => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM user', (err, result, fields) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const getUser = (conn, login) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM user WHERE login = ?', [login], (err, result, fields) => {
            if (err) reject(err);
            resolve(result.length ? result[0] : null);
        })
    })
}

const getUserById = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM user WHERE ID = ?', [id], (err, result, fields) => {
            if (err) reject(err);
            resolve(result.length ? result[0] : null);
        })
    })
}


const userExist = (conn, login) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM user WHERE login=?', [login], (err, result, fields) => {
            if (err) reject(err);
            console.log(result, 'toto je result', err);
            resolve(result.length > 0)
        })
    })
}

const storeUser = (conn, sessionId, login) => {
    return new Promise((resolve, reject) => {
        console.log('storing user', sessionId, login);
        conn.query('INSERT INTO session_table (session_id, login, created_at) VALUES(?, ?, ?)', [sessionId, login, new Date()], (err, result, fields) => {
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

const deleteSessionId = (conn, sessionId) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM session_table WHERE session_id = ?', [sessionId], (err, result, fields) => {
            if (err) reject(err);
            resolve();
        })
    })
}

const createUser = (conn, data) => {
    return new Promise((resolve, reject) => {
        const name = data.name || null;
        const gender = data.gender || null;
        const birthDate = data.birth_date || null;
        const email = data.email || null;
        const address = data.address || null;
        const login = data.login || null;
        const password = data.password || null;
        const query = 'INSERT INTO user (name, gender, birth_date, email, address, login, password) VALUES(?, ?, ?, ?, ?, ?, ?)'
        conn.query(query, [name, gender, birthDate, email, address, login, password], (err, result, fields) => {
            if (err) reject(err);
            resolve();
        })
    })
}

const updateUser = (conn, data) => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE user SET name=?, email=?, address=?, birth_date=?, password=?, gender=? WHERE login=?`, [data.name, data.email, data.address, data.birth, data.password, data.gender, data.login], (err, result, fields) => {
            if (err) reject(err);
            resolve();
        })
    })
}

const isAdmin = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM admin where ID=?", [id], (err, result, fields) => {
            if (err) reject(err);
            console.log(err);
            resolve(result.length > 0);
        })
    })
}

const isStudent = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM student where ID=?", [id], (err, result, fields) => {
            if (err) reject(err);
            resolve(result.length > 0);
        })
    })
}

const isTeacher = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM teacher where ID=?", [id], (err, result, fields) => {
            if (err) reject(err);
            console.log(err);
            resolve(result.length > 0);
        })
    })
}

const isScheduler = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM scheduler where ID=?", [id], (err, result, fields) => {
            if (err) reject(err);
            resolve(result.length > 0);
        })
    })
}

const getUserType = async (conn, login) => {
    try {
        const user = await getUser(conn, login);
        const id = user.ID;
        const isAdmin_ = await isAdmin(conn, id);
        if (isAdmin_) return 'admin';

        const isScheduler_ = await isScheduler(conn, id);
        if (isScheduler_) return 'scheduler';

        const isTeacher_ = await isTeacher(conn, id);
        if (isTeacher_) return 'teacher';

        const isStudent_ = await isStudent(conn, id);
        if (isStudent_) return 'student';

        return 'guest';
    }
    catch (err) {
        console.log(err);
        return 'guest';
    }

}

const getUserFromSession = (conn, sessionId) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM session_table WHERE session_id = ?', [sessionId], (err, result, fields) => {
            if (err) reject(err);
            resolve(result.length ? result[0] : null);
        })
    })
}

const deleteUser = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query('SET FOREIGN_KEY_CHECKS=0;\
            DELETE FROM user WHERE ID = ?;\
            SET FOREIGN_KEY_CHECKS=1;', [id], (err, result, fields) => {
            if (err) reject(err);
            resolve();
        })
    })
}

const setUserRole = (conn, login, role) => {
    return new Promise(async (resolve, reject) => {
        const previousRole = await getUserType(conn, login);
        const tableMap = {
            'admin': 'admin',
            'scheduler': 'scheduler',
            'teacher': 'teacher',
            'student': 'student'
        };
        const deleteTable = tableMap[previousRole]

        console.log('deleting from table', deleteTable)
        const user = await getUser(conn, login);
        const userId = user.ID;
        if (deleteTable) {
            conn.query(`DELETE FROM ${deleteTable} WHERE ID=?`, [userId], (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
            })
        }
        const insertTable = tableMap[role];
        console.log('inserting into table', insertTable, 'nova rola', role);
        conn.query(`INSERT INTO ${insertTable} (ID) VALUES (?)`, [userId], (err, result, fields) => {
            if (err) reject(err);
            resolve();
        })
    })
}


export default {
    getAllUsers,
    getUser,
    userExist,
    storeUser,
    sessionIdExists,
    deleteSessionId,
    createUser,
    updateUser,
    deleteUser,
    getUserById,

    isAdmin,
    isStudent,
    isScheduler,
    isTeacher,
    getUserType,
    getUserFromSession,
    setUserRole
}
