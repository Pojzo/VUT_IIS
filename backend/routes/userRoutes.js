import { middleware, adminAuthMiddleware } from '../middleware/middleware.js';
import userSchemas from '../schemas/userSchemas.js';
import userController from '../controllers/userController.js';

import Express from 'express';

const router = Express.Router();

router.get('/users', adminAuthMiddleware, userController.getAllUsers)
router.get('/users/user/:login', adminAuthMiddleware, userController.getUser);
router.get('/users/get-my-info', userController.getMyInfo);

router.put('/users/user/:login', adminAuthMiddleware, middleware(userSchemas.updateUserSchema, 'body'), userController.updateUser);
router.put('/users/change-user-role', adminAuthMiddleware, userController.changeUserRole);

router.delete('/users/user/:login', adminAuthMiddleware, userController.deleteUser);

router.post('/users/create-user', adminAuthMiddleware, middleware(userSchemas.createUserSchema, 'body'), userController.createUser);
router.post('/auth/login', middleware(userSchemas.loginSchema, 'body'), userController.loginUser);
router.post('/auth/logout', middleware(userSchemas.logoutSchema, 'body'), userController.logoutUser);

export default router;