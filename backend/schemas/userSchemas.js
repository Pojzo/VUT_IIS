import { LogOutput } from "concurrently";
import session from "express-session";
import Joi from "joi";

const loginPattern = Joi.string().alphanum().min(8).max(8)
const passwordPattern = Joi.string().min(8).max(30)
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
    email: Joi.string().email(),
    birthDate: Joi.date(),
    gender: Joi.string(),
    address: Joi.string()
})

export default {
    loginSchema,
    logoutSchema,
    createUserSchema,
}