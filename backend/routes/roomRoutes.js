import { middleware } from '../middleware/middleware.js';
import roomSchema from '../schemas/roomSchemas.js';
import roomController from '../controllers/roomController.js';

import Express from 'express';

const router = Express.Router();

router.get('/rooms', roomController.getAllRooms);
router.get('/rooms/room/:room', middleware(roomSchema.roomSchema), roomController.getRoom);
router.put('/rooms/room/:room', middleware(roomSchema.roomSchema), roomController.updateRoom);
router.delete('/rooms/room/:room', middleware(roomSchema.roomSchema), roomController.deleteRoom);

router.post('/rooms/create-room', middleware(roomSchema.createRoomSchema), roomController.createRoom);

export default router;