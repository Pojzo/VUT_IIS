import Joi from "joi";

export const loginSchema = Joi.object({
    login: Joi.string().alphanum().min(8).max(8).required(),
    password: Joi.string().min(8).max(30).required()
})

