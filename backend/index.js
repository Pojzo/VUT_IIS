import express from 'express';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createConnection } from './connect.js';
import * as encrypt from './utils/encrypt.js';
import * as api from './api.js';
import { INTERNAL_SERVER_ERROR, DB_NOT_CONNECTED, USER_NOT_FOUND, BAD_REQUEST, USER_ALREADY_EXISTS } from './errorCodes.js';

const app = express();
const PORT = 5000;

const __dirname = dirname(fileURLToPath(import.meta.url));

const CLIENT_DIR = path.join(__dirname, '../frontend/');
const BUILD_DIR = path.join(CLIENT_DIR, 'build');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(cors())
app.use(express.static(path.join(BUILD_DIR)));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
})

const conn = createConnection();
let connected = false;
conn.connect(err => {
    if (err) {
        return;
    }
    connected = true;
    // testUser(conn);
})

app.listen(PORT, () => {
    console.log('Listening on port' + PORT);

})
app.get('/users', (req, res) => {
    if (connected) {
        console.log('fetched all users');
        api.getAllUsers(conn).then(result => {
            res.send(result);
        })
            .catch(err => {
                res.send(err);
            })
    }
    else {
        res.send('Not connected');
    }
})

app.post('/users/create-user', async (req, res) => {
    if (connected) {
        const userExists = await api.userExists(conn, req.body.login, req.body.email);
        if (userExists) {
            return res.status(USER_ALREADY_EXISTS.code).send(USER_ALREADY_EXISTS.message);
        }
        return res.send('User created');
        // api.createUser(conn).then(result => {
        //     res.send(result);
        // })
        //     .catch(err => {
        //         res.send(err);
            // })
    }
    else {
        res.send('Not connected');
    }
})

app.post('/login', async (req, res) => {
    try {
        if (!connected) {
            return res.status(DB_NOT_CONNECTED.code).send(DB_NOT_CONNECTED.message);
        }

        const login = req.query.login;
        const inputPassword = req.body.password;

        if (!login || !inputPassword) {
            return res.status(BAD_REQUEST.code).send(BAD_REQUEST.message);
        }

        const user = await api.getUser(conn, login);

        if (!user) {
            return res.status(USER_NOT_FOUND.code).send(USER_NOT_FOUND.message);
        }
        const hashedPassword = await user.password;
        const passwordCorrect = await encrypt.isPasswordCorrect(inputPassword, hashedPassword);

        if (passwordCorrect) {
            return res.send('Correct password');
        }
        return res.send('Incorrect password');

    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR.code).send(INTERNAL_SERVER_ERROR.message);
    }
})

app.get('/users/user/:login', async (req, res) => {
    try {
        if (!connected) {
            return res.status(DB_NOT_CONNECTED.code).send(DB_NOT_CONNECTED.message);
        }
        const login = req.params.login;
        if (!login) {
            return res.status(BAD_REQUEST.code).send(BAD_REQUEST.message);
        }

        const user = await api.getUser(conn, login);
        if (!user) {
            return res.status(USER_NOT_FOUND.code).send(USER_NOT_FOUND.message);
        }
        console.log('fetched user ', login)
        return res.send(user);
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR.code).send(INTERNAL_SERVER_ERROR.message);
    }
})

app.post('/login', (req, res) => {
    // print the login and password
    return;
    console.log(req.body.login);
    console.log(req.body.password);
})