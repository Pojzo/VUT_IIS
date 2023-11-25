import Joi from "joi";

const loginPattern = Joi.string().alphanum().min(5);
const passwordPattern = Joi.string().min(5);
const sessionIdPattern = Joi.string().required()

const loginWithCredentialsSchema = Joi.object({
    login: loginPattern.required(),
    password: passwordPattern.required()
});

const loginWithSessionIdSchema = Joi.object({
    sessionId: sessionIdPattern
});

const loginSchema = Joi.alternatives().try(
    loginWithCredentialsSchema,
    loginWithSessionIdSchema
);

const logoutSchema = Joi.object({
    sessionId: sessionIdPattern
})


const createUserSchema = Joi.object({
    login: loginPattern.required(),
    password: passwordPattern.required(),
    name: Joi.string().min(3).max(30),
    email: Joi.string().email().allow(""),
    birth_date: Joi.date().allow(""),
    gender: Joi.string().allow(""),
    address: Joi.string().allow(""),
})

const updateUserSchema = Joi.object({
        login: loginPattern.required(),
        name: Joi.string().min(3).max(30),
        email: Joi.string().email().allow(""),
        birth_date: Joi.date().allow(""),
        gender: Joi.string().allow(""),
        address: Joi.string().allow(""),

    })

export default {
    loginSchema,
    logoutSchema,
    createUserSchema,
    updateUserSchema
}