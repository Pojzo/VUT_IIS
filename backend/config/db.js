import mysql from 'mysql2';

export const  createConnection = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'IISroot',
        database: 'xgazdi04',
        multipleStatements: true
    })
}

const conn = createConnection();

export default conn;