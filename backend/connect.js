import mysql from 'mysql2';

export const  createConnection = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'IISroot',
        database: 'xgazdi04',
    })
}

const conn = createConnection();

    
conn.connect(err => {
    if (err) {
        console.error('Error connecting to DB');
        return;
    }
    // conn.query('SELECT * FROM User', (err, result, fields) => {
    //     if (err) {
    //         console.error('Error while querying', err);
    //         return;
    //     }
    //     console.log(result);
    // })
})
