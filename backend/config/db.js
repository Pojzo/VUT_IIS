import mysql from 'mysql2';

export const  createConnection = () => {
    return mysql.createConnection({
        host: '34.118.123.150',
        user: 'root',
        password: 'merlin',
        database: 'xkovac66',
        multipleStatements: true,
	    port: 3306
    })
}

const conn = createConnection();

export default conn;