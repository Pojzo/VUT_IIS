import mysql from 'mysql2';

export const  createConnection = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'xgazdi04',
        password: 'bavojpa8' ,
        database: 'xgazdi04',
        socketPath: '/var/run/mysql/mysql.sock'
    
    })
}
