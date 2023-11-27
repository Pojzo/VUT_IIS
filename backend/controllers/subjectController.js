import conn from "../config/db.js";
import subjectServices from "../services/subjectServices.js";
import userServices from "../services/userServices.js";
import { GUARANTEE_NOT_FOUND, DB_NOT_CONNECTED, USER_NOT_FOUND, SUBJECT_ALREADY_EXISTS, INTERNAL_SERVER_ERROR, INCORRECT_PASSWORD, SUBJECT_NOT_FOUND } from "../config/errorCodes.js";
import session from "express-session";
//import { isPasswordCorrect } from "../utils/encrypt.js";

//TODO userservices
const createSubject = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send(DB_NOT_CONNECTED.message);
    }
    console.log('creating subject', req.body)
    const subjectExists = await subjectServices.subjectExists(conn, req.body.code, req.body.name);

    const guaranteeExists = await userServices.userExist(conn, req.body.guarantee_login)

    if (subjectExists) {
        return res.status(SUBJECT_ALREADY_EXISTS.code).send({ message: SUBJECT_ALREADY_EXISTS.message });
    }
    if (!guaranteeExists) {

        return res.status(GUARANTEE_NOT_FOUND.code).send({ message: GUARANTEE_NOT_FOUND.message });
    }
    const guarantee = await userServices.getUser(conn, req.body.guarantee_login);
    try {
        const data = {
            SUBJECT_CODE: req.body.SUBJECT_CODE,
            name: req.body.name,
            credits: req.body.credits,
            guarantee: guarantee.ID
        }
        subjectServices.createSubject(conn, data)
            .then(result => {
                res.send({ message: 'created subject' });
            })
            .catch(err => {
                res.send({ message: err.message });
            })

    }
    catch (err) {
        console.error(err);
        // send error in jsonf format
        res.status(INTERNAL_SERVER_ERROR.code).send(INTERNAL_SERVER_ERROR.message);
    }
}

const getAllSubjects = (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send(DB_NOT_CONNECTED.message);
    }
    subjectServices.getAllSubjects(conn).then(result => {
        res.send(result);
    })
        .catch(err => {
            res.send(err);
        })
}

const getSubject = (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send(DB_NOT_CONNECTED.message);
    }
    subjectServices.getSubject(conn, req.params.subject).then(result => {
        res.send(result);
    })
        .catch(err => {
            res.send(err);
        })
}

const updateSubject = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send(DB_NOT_CONNECTED.message);
    }

    const subject = await subjectServices.getSubject(conn, req.body.SUBJECT_CODE);
    if (!subject) {
        return res.status(USER_NOT_FOUND.code).send({ message: "Subject doesnt exist" });
    }
    const guaranteeExists = await userServices.userExist(conn, req.body.guarantee_login);
    if (!guaranteeExists) {
        return res.status(USER_NOT_FOUND.code).send({ message: "Guarantee doesnt exist" });
    }
    const guarantee = await userServices.getUser(conn, req.body.guarantee_login);
    try {
        const data = {
            code: req.body.SUBJECT_CODE,
            name: req.body.name || subject.name,
            credits: req.body.credits || subject.credits,
            guarantee_id: guarantee.ID
        }
        subjectServices.updateSubject(conn, data)
            .then(result => {
                res.send({ message: 'updated subject' });
            })
            .catch(err => {
                res.send({ message: err.message });
            })
    }
    catch (err) {
        console.error(err);
        // send error in jsonf format
        res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message + err.message });
    }
}

const deleteSubject = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }
    console.log('deleting subject', req.params.subject)

    const subject = await subjectServices.getSubject(conn, req.params.subject);

    if (!subject) {
        console.log('subject doesnt exist deleteSubject()', req.params.subject);
        return res.status(USER_NOT_FOUND.code).send({ message: "Subject doesnt exist" });
    }

    try {
        subjectServices.deleteSubject(conn, subject.SUBJECT_CODE).then(result => {
            res.send({ message: 'deleted subject' })
        })
            .catch(err => {
                res.send({ message: err.message });
            })
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message });
    }
}

const addSubjectToUser = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }

    const subject = await subjectServices.getSubject(conn, req.body.SUBJECT_CODE);

    if (!subject) {
        console.log('subject doesnt exist addObjectToUser()')
        return res.status(SUBJECT_NOT_FOUND.code).send({ message: "Subject doesnt exist" });
    }

    const sessionID = req.cookies.sessionId;
    const user_login = await userServices.getUserFromSession(conn, sessionID)
    const user = await userServices.getUser(conn, user_login.login);


    if (!user) {
        console.log('user doesnt exist addObjectToUser()', user, user_login)
        return res.status(USER_NOT_FOUND.code).send({ message: USER_NOT_FOUND.message });
    }

    try {
        const user_id = user.ID;
        const subject_code = subject.SUBJECT_CODE;
        console.log('Adding subject to user', user_id, subject_code)
        subjectServices.addSubjectToUser(conn, user_id, subject_code).then(result => {
            res.send({ message: 'added subject to user' })
        })
            .catch(err => {
                res.send({ message: err.message });
            })
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message });
    }
}

const getMySubjects = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }
    console.log('getting my subjects')
    const sessionId = req.cookies.sessionId;
    const user_login = await userServices.getUserFromSession(conn, sessionId);
    const user = await userServices.getUser(conn, user_login.login);

    if (!user) {
        console.log('user doesnt exist getMySubjects(), sessionId', session)
        return res.status(USER_NOT_FOUND.code).send({ message: USER_NOT_FOUND.message });
    }
    try {
        const user_id = user.ID;
        subjectServices.getMySubjects(conn, user_id).then(result => {
            res.send(result)
        })
            .catch(err => {
                res.send({ message: err.message });
            })
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message });
    }
}

const deleteSubjectFromUser = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }
    console.log('deleting subject from user', req.body);

    const subject = await subjectServices.getSubject(conn, req.body.SUBJECT_CODE);
    if (!subject) {
        return res.status(SUBJECT_NOT_FOUND.code).send({ message: "Subject doesnt exist" });
    }
    const user_login = await userServices.getUserFromSession(conn, req.cookies.sessionId);
    const user = await userServices.getUser(conn, user_login.login);
    if (!user) {
        return res.status(USER_NOT_FOUND.code).send({ message: USER_NOT_FOUND.message });
    }
    try {
        const user_id = user.ID;
        const subject_code = subject.SUBJECT_CODE;

        subjectServices.deleteSubjectFromUser(conn, user_id, subject_code).then(result => {
            res.send({ message: 'deleted subject from user' })
        })
        .catch(err => {
            console.error(err);
            res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message });
        })
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message });
    }
}

const getSubjectsTeaches = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }
    const sessionId = req.cookies.sessionId;
    const user_login = await userServices.getUserFromSession(conn, sessionId);

    const user = await userServices.getUser(conn, user_login.login);

    if (!user) {
        console.log('user doesnt exist getMySubjects(), sessionId', session)
        return res.status(USER_NOT_FOUND.code).send({ message: USER_NOT_FOUND.message });
    }
    try {
        const user_id = user.ID;
        subjectServices.getTeacherSubjects(conn, user_id).then(result => {
            res.send(result)
        })
            .catch(err => {
                res.send({ message: err.message });
            })
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message });
    }
}

const getSubjectsGuarantees = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }
    const sessionId = req.cookies.sessionId;
    const user_login = await userServices.getUserFromSession(conn, sessionId);
    const user = await userServices.getUser(conn, user_login.login);

    if (!user) {
        console.log('user doesnt exist getMySubjects(), sessionId', session)
        return res.status(USER_NOT_FOUND.code).send({ message: USER_NOT_FOUND.message });
    }
    try {
        const user_id = user.ID;
        subjectServices.getGuaraneeSubjects(conn, user_id).then(result => {
            res.send(result)
        })
            .catch(err => {
                res.send({ message: err.message });
            })
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message });
    }
}

const getSubjectTeachers = async (req, res) => {
    console.log("getting subject teachers");
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }
    const subject = await subjectServices.getSubject(conn, req.params.subject);
    if (!subject) {
        return res.status(SUBJECT_NOT_FOUND.code).send({ message: "Subject doesnt exist" });
    }
    try {
        const SUBJECT_CODE = subject.SUBJECT_CODE;
        subjectServices.getSubjectTeachers(conn, SUBJECT_CODE).then(result => {
            res.send({ message: result });
        })
            .catch(err => {
                res.send({ message: err.message });
            })
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message });
    }
}

const addTeacherToSubject = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }
    
    const teacher = await userServices.getUser(conn, req.body.login);


    if (!teacher) {
        console.log('Teacher doesnt exist addTeacherToSubject()')
        return res.status(USER_NOT_FOUND.code).send({ message: "User doesnt exist" });
    }

    const userTypes = await userServices.getUserType(conn, teacher.login);


    if (userTypes !== 'teacher') {
        console.log('User is not a teacher addTeacherToSubject()')
        return res.status(USER_NOT_FOUND.code).send({ message: "User is not a teacher" });
    }

    const subject = await subjectServices.getSubject(conn, req.body.subject);

    if (!subject) {
        return res.status(SUBJECT_NOT_FOUND.code).send({ message: "Subject doesnt exist" });
    }

    try {
        const teacher_id = teacher.ID
        const SUBJECT_CODE = subject.SUBJECT_CODE;
        console.log('Adding user to subject', teacher_id, SUBJECT_CODE)

        subjectServices.addTeacherToSubject(conn, teacher_id, SUBJECT_CODE).then(result => {
            res.send({ message: 'added user to subject' })
        })
            .catch(err => {
                res.send({ message: err.message });
            })
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message });
    }
}

const deleteTeacherFromSubject = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }
    
    const teacher = await userServices.getUser(conn, req.body.login);
    if (!teacher) {
        return res.status(USER_NOT_FOUND.code).send({ message: "User doesnt exist" });
    }

    const subject = await subjectServices.getSubject(conn, req.body.subject);

    if (!subject) {
        return res.status(SUBJECT_NOT_FOUND.code).send({ message: "Subject doesnt exist" });
    }

    try {
        const teacher_id = teacher.ID
        const SUBJECT_CODE = subject.SUBJECT_CODE;
        console.log('deleting user from subject', teacher_id, SUBJECT_CODE)

        subjectServices.deleteTeacherFromSubject(conn, teacher_id, SUBJECT_CODE).then(result => {
            res.send({ message: 'deleted teacher from subject' })
        })
            .catch(err => {
                res.send({ message: err.message });
            })
    }
    catch (err) {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message });
    }
}



export default {
    createSubject,
    getAllSubjects,
    getSubject,
    deleteSubject,
    updateSubject,
    addSubjectToUser,
    getMySubjects,
    deleteSubjectFromUser,
    getSubjectsTeaches,
    getSubjectsGuarantees,
    addTeacherToSubject,
    getSubjectTeachers,
    deleteTeacherFromSubject
}