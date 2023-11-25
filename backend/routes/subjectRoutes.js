import { middleware } from '../middleware/middleware.js';
import { userAuthMiddleware, teacherAuthMiddleware } from '../middleware/middleware.js';
import subjectSchemas  from '../schemas/subjectSchemas.js';
import subjectController from '../controllers/subjectController.js';

import Express from 'express';

const router = Express.Router();

router.get('/subjects', subjectController.getAllSubjects);
router.get('/subjects/subject/:subject', subjectController.getSubject);
router.get('/subjects/my-subjects', userAuthMiddleware, subjectController.getMySubjects);
router.get('/subjects/teaches', teacherAuthMiddleware, subjectController.getSubjectsTeaches);
router.get('/subjects/guarantees', teacherAuthMiddleware, subjectController.getSubjectsGuarantees);
router.get('/subjects/teachers/:subject', teacherAuthMiddleware, subjectController.getSubjectTeachers);


router.put('/subjects/subject/:subject', middleware(subjectSchemas.createSubjectSchema, 'body'), subjectController.updateSubject);

router.delete('/subjects/subject/:subject', subjectController.deleteSubject);
router.delete('/subjects/user-delete-subject', subjectController.deleteSubjectFromUser);
router.delete('/subjects/delete-teacher', subjectController.deleteTeacherFromSubject);

router.post('/subjects/create-subject', middleware(subjectSchemas.createSubjectSchema, 'body'), subjectController.createSubject)
router.post('/subjects/user-add-subject', subjectController.addSubjectToUser);
router.post('/subjects/add-teacher', subjectController.addTeacherToSubject);

export default router;