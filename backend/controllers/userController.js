import conn from "../config/db.js";
import userServices from "../services/userServices.js";
import { DB_NOT_CONNECTED, USER_NOT_FOUND, USER_ALREADY_EXISTS, INTERNAL_SERVER_ERROR, INCORRECT_PASSWORD } from "../config/errorCodes.js";
import { hashPassword, isPasswordCorrect } from "../utils/encrypt.js";

import { randomBytes } from "crypto";

const getAllUsers = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({message: DB_NOT_CONNECTED.message});
    }
    try {
        const result = await userServices.getAllUsers(conn);
        for (let i = 0; i < result.length; i++) {
            const role = await userServices.getUserType(conn, result[i].login);
            result[i].role = role;
        }
        res.send(result);
    } catch (err) {
        res.send(err);
    }
}


const getUser = (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({message: DB_NOT_CONNECTED.message});
    }
    userServices.getUser(conn, req.params.login).then(result => {
        res.send(result);
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
            return res.status(USER_NOT_FOUND.code).send({ message: USER_NOT_FOUND.message });
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
            userServices.storeUser(conn, nextSessionId, login)
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
        res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message });
    }
}

const logoutUser = async (req, res) => {
    try {

        //checks if database is connected
        if (conn.state === 'disconnected') {
            console.log('db not connected');
            return res.status(DB_NOT_CONNECTED.code).send(DB_NOT_CONNECTED.message);
        }

        const sessionId = req.body.sessionId;

        if (sessionId === undefined) {
            console.log('session id undefined');
            return res.status(USER_NOT_FOUND.code).send(USER_NOT_FOUND.message);
        }
        //checks if session id exists
        const sessionExists = await userServices.sessionIdExists(conn, sessionId);
        //const sessionExists = await userServices.sessionIdExists(conn, req.sessionId);

        if (!sessionExists) {
            console.log('session doesnt exist');
            //ERROR
            return res.status(USER_NOT_FOUND.code).send(USER_NOT_FOUND.message);
        }

        console.log('session exists');
        userServices.deleteSessionId(conn, sessionId)
            .then(() => {
                res.clearCookie('sessionId');
                res.json({ message: 'LOGGED_OUT' });
            })
            .catch(err => {
                console.log('Coulndt delete session id', err);
            })
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR.code).send(INTERNAL_SERVER_ERROR.message);
    }
}

const createUser = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }
    const userExists = await userServices.userExist(conn, req.body.login, req.body.email);
    if (userExists) {
        console.log('user already exists')
        res.status(USER_ALREADY_EXISTS.code).send({ message: USER_ALREADY_EXISTS.message });
        return;
    }
    console.log('creating user');
    try {
        const hashedPassword = await hashPassword(req.body.password);
        const data = {
            login: req.body.login,
            password: hashedPassword,
            name: req.body.name,
            birth_date: req.body.birth_date,
            email: req.body.email,
            address: req.body.address,
            gender: req.body.gender
        }
        userServices.createUser(conn, data)
            .then(result => {
                res.send({ message: 'created user' });
            })
            .catch(err => {
                res.send(err);
            })

    }
    catch (err) {
        console.error(err);
        // send error in jsonf format
        res.status(INTERNAL_SERVER_ERROR.code).send(INTERNAL_SERVER_ERROR.message);
    }

}

const updateUser = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }
    const userExists = await userServices.userExist(conn, req.body.login);
    if (!userExists) {
        res.status(USER_NOT_FOUND.code).send({ message: USER_NOT_FOUND.message });
        return;
    }
    const user = await userServices.getUser(conn, req.body.login);
    try {
        const data = {
            login: req.body.login,
            password: req.body.password || user.password,
            name: req.body.name || user.name,
            birth_date: req.body.birth_date || user.birth_date,
            email: req.body.email || user.email,
            address: req.body.address || user.address,
            gender: req.body.gender || user.gender
        }
        userServices.updateUser(conn, data)
            .then(() => res.send({ message: 'updated user' }))
            .catch(err => {
                res.status(INTERNAL_SERVER_ERROR.code).send({ message: err.message })
                console.log(err)
            });
    }
    catch (err) {
        console.error(err);
        // send error in jsonf format
        res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message });
    }
}


const deleteUser = async (req, res) => {
    console.log("delete");
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }
    const user = await userServices.getUser(conn, req.params.login);
    if (!user) {
        return res.status(USER_NOT_FOUND.code).send({ message: USER_NOT_FOUND.message });
    }

    console.log('sem som sa dostal', user);
    try {
        userServices.deleteUser(conn, user.ID).then(result => {
            console.log('deleted user');
            res.send({ message: 'deleted user' });
        })
            .catch(err => {
                res.send({ message: err.message });
                console.log('Coulndt delete user', err)
            })
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message });
    }
}

const getMyInfo = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }
    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
        return res.status(USER_NOT_FOUND.code).send({ name: 'Not logged in', role: 'guest' });
    }
    try {
        const user = await userServices.getUserFromSession(conn, sessionId);
        if (!user) {
            return res.status(USER_NOT_FOUND.code).send({ name: 'Not logged in', role: 'guest' });
        }
        const login = user.login;
        const role = await userServices.getUserType(conn, login);

        res.send({ name: login, role: role })
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message });
    }
}

const changeUserRole = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }
    const userExists = await userServices.userExist(conn, req.body.login);
    if (!userExists) {
        res.status(USER_NOT_FOUND.code).send({ message: USER_NOT_FOUND.message });
        return;
    }
    const user = await userServices.getUser(conn, req.body.login);
    const role = await userServices.getUserType(conn, req.body.login);

    if (role === req.body.role) {
        return res.status(409).send({ message: 'user already has this role' });
    }

    try {
        userServices.setUserRole(conn, user.login, req.body.role)
            .then(() => res.send({ message: 'updated user role' }))
            .catch(err => {
                res.status(INTERNAL_SERVER_ERROR.code).send({ message: err.message })
                console.log(err)
            });
    }
    catch (err) {
        console.error(err);
        // send error in jsonf format
        res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message });
    }    
}

export default {
    getAllUsers,
    getUser,
    loginUser,
    createUser,
    updateUser,
    deleteUser,
    logoutUser,
    getMyInfo,
    changeUserRole
}