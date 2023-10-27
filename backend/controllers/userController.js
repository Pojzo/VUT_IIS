import conn from "../config/db.js";
import userServices from "../services/userServices.js";
import { DB_NOT_CONNECTED, USER_NOT_FOUND, USER_ALREADY_EXISTS, INTERNAL_SERVER_ERROR, INCORRECT_PASSWORD } from "../config/errorCodes.js";
import jwt from 'jsonwebtoken';
import { jwtSecret } from "../config/jwtSecret.js";
import { isPasswordCorrect } from "../utils/encrypt.js";

import { randomBytes } from "crypto";
import session from "express-session";


const getAllUsers = (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send(DB_NOT_CONNECTED.message);
    }
    userServices.getAllUsers(conn).then(result => {
        res.send(result);
    })
        .catch(err => {
            res.send(err);
        })
}

const getUser = (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send(DB_NOT_CONNECTED.message);
    }
    userServices.getUser(conn, req.params.login).then(result => {
        res.send(result[0]);
    })
        .catch(err => {
            res.send(err);
        })
}

const loginUser = async (req, res) => {
    try {
        if (conn.state === 'disconnected') {
            return res.status(DB_NOT_CONNECTED.code).send(DB_NOT_CONNECTED.message);
        }

        const sessionId = req.cookies.sessionId;

        if (sessionId !== undefined) {
            const sessionExists = await userServices.sessionIdExists(conn, sessionId);
            if (sessionExists) {
                res.json({ message: 'CORRECT_PASSWORD' });
                return;
            }
        }

        const login = req.body.login;
        const inputPassword = req.body.password;


        const user = await userServices.getUser(conn, login);

        if (!user) {
            return res.status(USER_NOT_FOUND.code).send(USER_NOT_FOUND.message);
        }
        const hashedPassword = await user.password;
        const passwordCorrect = await isPasswordCorrect(inputPassword, hashedPassword);

        const createNewSessionId = () => {
            const nextSessionId = randomBytes(16).toString('base64');

            return nextSessionId;
        }

        if (passwordCorrect) {
            const payload = {
                userId: user.ID,
                login: user.login,
            }
            const nextSessionId = createNewSessionId();
            userServices.storeUser(conn, nextSessionId, 'student')
                .then(() => {
                    console.log('stored user');
                })
                .catch(err => {
                    console.log('Coulndt store user', err);
                })

            console.log('next session id', nextSessionId);
            res.cookie('sessionId', nextSessionId, { secure: false, httpOnly: false });
            res.json({ message: 'CORRECT_PASSWORD' })

            return;
        }
        return res.status(INCORRECT_PASSWORD.code).json({ message: 'INCORRECT_PASSWORD' });
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR.code).send(INTERNAL_SERVER_ERROR.message);
    }
}

const logoutUser = async (conn, req, res) => {
    console.log('logging out');
    try {

    }
    catch (err) {

    }
}

const createUser = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send(DB_NOT_CONNECTED.message);
    }
    const userExists = await userServices.userExist(conn, req.body.login, req.body.email);
    if (userExists) res.status(USER_ALREADY_EXISTS.code).send(USER_ALREADY_EXISTS.message);
}

export default {
    getAllUsers,
    getUser,
    loginUser,
    createUser,
    logoutUser
}