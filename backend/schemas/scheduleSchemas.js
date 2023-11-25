import Joi from "joi";

const subjectSchema = Joi.object({
    subjectCode: Joi.string().min(3).max(3).required(),
})

const roomSchema = Joi.object({
    roomCode: Joi.string().min(3).max(3).required(),
})    

const activitySchema = {
    subject: subjectSchema.required(), 
    room: roomSchema.required(),
    
}

const regularActivitySchema = Joi.object({
    subject: subjectSchema.required(),
    room: roomSchema.required(),
    day: Joi.number().min(1).max(7).required(),
    startHour: Joi.number().min(0).max(23).required(),
    startMinute: Joi.number().min(0).max(59).required(),
    duration: Joi.number().min(1).max(240).required(),
})

const oneTimeActivitySchema = Joi.object({
}) 