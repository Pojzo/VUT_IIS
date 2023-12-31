import { adminAuthMiddleware, middleware } from '../middleware/middleware.js';
import activityController from '../controllers/activityController.js';

import Express from 'express';
import activitySchemas from '../schemas/activitySchemas.js';

const router = Express.Router();

router.post('/activities/create-activity', middleware(activitySchemas.createActivitySchema, 'body'), activityController.createActivity);
router.post('/activities/create-activity-request', activityController.createActivityRequest);
router.post('/activities/activity-request-solve', activityController.solveActivityRequest);

router.delete('/activities/delete-activity/:activity', activityController.deleteActivity);

router.get('/activities/my-activities', activityController.getMyActivities);
router.get('/activities/activity-requests', activityController.getActivityRequests);
router.get('/activities/my-activity-requests', activityController.getMyActivityRequests);

export default router;