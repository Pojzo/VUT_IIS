import Joi from "joi";

const createSubjectSchema = Joi.object({
    SUBJECT_CODE: Joi.string().required(),
    name: Joi.string().required(),
    credits: Joi.number(),
    guarantee_login: Joi.string().allow(null),
})

export default{
    createSubjectSchema,
}