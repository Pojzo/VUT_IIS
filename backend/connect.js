import mysql from 'mysql2';

const con = mysql.createConnection({
    host: 'localhost',
    user: 'xgazdi04',
    password: 'bavojpa8' ,
    database: 'xgazdi04',
})

con.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL server!');
})