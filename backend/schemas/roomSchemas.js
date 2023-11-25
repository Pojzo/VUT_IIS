import Joi from "joi";

const createRoomSchema = Joi.object({
    ROOM_ID: Joi.string().required(),
    capacity: Joi.number().required(),
})

const roomSchema =  Joi.object({
    ROOM_ID: Joi.string().required(),
})


export default {
    createRoomSchema,
    roomSchema,
}