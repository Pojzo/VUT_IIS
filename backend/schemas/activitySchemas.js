import Joi from "joi";

const createActivitySchema = Joi.object({
    SUBJECT_CODE: Joi.string().required(),
    type: Joi.valid(...['lecture', 'exercise', 'lab', 'project', 'seminar', 'other']).required(),
    duration: Joi.number().required().min(1).max(4),
    frequency: Joi.number().min(1).max(4),
    room_id: Joi.string().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required()
})


export default{
    createActivitySchema
}