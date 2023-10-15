export const testApi = conn => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM User", (err, result, fields) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}
