import userServices from "../services/userServices.js";
import conn from "../config/db.js";

export const middleware = (schema, property) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        const valid = error == null;

        if (valid) {
            next();
        }
        else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            console.log("error", message)
            res.status(422).json({ message: message })
        }
    }
}

export const adminAuthMiddleware = async (req, res, next) => {
    try {
        const sessionId = req.cookies.sessionId;
        console.log('sessionId: ', sessionId)
        if (!sessionId) throw new Error('Not authorized - missing sessionID');

        const user = await userServices.getUserFromSession(conn, sessionId);
        if (!user) throw new Error('Not authorized - user not found');
        const userType = await userServices.getUserType(conn, user.login);
        if (userType === 'admin') {
            next();
        }
        else {
            console.log('Not authorized');
            throw new Error('Not authorized');
        }
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
}

export const userAuthMiddleware = async (req, res, next) => {
    try {
        console.log('userAuthMiddleware')
        const sessionId = req.cookies.sessionId;
        if (!sessionId) throw new Error('Not authorized - missing sessionID');

        const user = await userServices.getUserFromSession(conn, sessionId);
        if (!user) throw new Error('Not authorized - user not found');

        const userType = await userServices.getUserType(conn, user.login);
        if (userType === 'student') {
            next();
        }
        else {
            console.log('Not authorized', userType);
            throw new Error('Not authorized');
        }
    }
    catch(error) {
        res.status(401).json({ message: error.message })
    }
}

export const teacherAuthMiddleware = async (req, res, next) => {
    try {
        const sessionId = req.cookies.sessionId;
        if (!sessionId) throw new Error('Not authorized - missing sessionID');

        const user = await userServices.getUserFromSession(conn, sessionId);

        if (!user) throw new Error('Not authorized - user not found');

        const userType = await userServices.getUserType(conn, user.login);
        if (userType === 'teacher') {
            next();
        }
        else {
            console.log('Not authorized');
            throw new Error('Not authorized');
        }
    }
    catch(error) {
        res.status(401).json({ message: error.message })
    }
}

