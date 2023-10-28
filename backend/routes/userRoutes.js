import { middleware } from '../middleware/middleware.js';
import userSchemas from '../schemas/userSchemas.js';
import userController from '../controllers/userController.js';

import Express from 'express';

const router = Express.Router();

router.get('/users', userController.getAllUsers)
router.get('/users/user/:login', userController.getUser);

router.post('/users/create-user', middleware(userSchemas.createUserSchema), userController.createUser);
router.post('/auth/login', middleware(userSchemas.loginSchema, 'body'), userController.loginUser);
router.post('/auth/logout', middleware(userSchemas.logoutSchema, 'body'), userController.logoutUser);


export default router;