import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { createFacultyZodSchema } from './faculty.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(createFacultyZodSchema),
  FacultyController.createFaculty
);
router.get('/', FacultyController.getAllFaculty);
router.get('/:id', FacultyController.getSingleFaculty);
router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoutes = router;
