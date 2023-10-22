export const getAllUsers = conn => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM User", (err, result, fields) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

export const getUser = (conn, login) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM User WHERE login = ?", [login], (err, result, fields) => {
            if (err) reject(err);
            if (result.length === 0) resolve(null);
            resolve(result[0]);
        });
    })
}

export const userExists = (conn, login, email) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM User WHERE login = ? or email = ?", [login, email], (err, result, fields) => {
            if (err) reject(err);
            resolve(result.length > 0);
        });
    })
}