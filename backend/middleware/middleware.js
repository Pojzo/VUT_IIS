import Joi from "joi";
// import { jwtSecret } from "../config/jwtSecret";

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
            res.status(422).json({ error: message })
        }
    }
}

export const verifyJWT = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    jwtSecret.verifyJWT(token, jwtSecret).then(result => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        next();
    })
}