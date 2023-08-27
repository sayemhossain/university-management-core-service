import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { createStudentZodSchema } from './student.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(createStudentZodSchema),
  StudentController.createStudent
);
router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudent);
router.delete('/:id', StudentController.deleteStudent);

export const StudentRoutes = router;
