import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(AcademicFacultyValidation.create),
  AcademicFacultyController.createAcademicFaculty
);
router.get('/', AcademicFacultyController.getAllFaculty);
router.get('/:id', AcademicFacultyController.getSingleFaculty);
router.delete('/:id', AcademicFacultyController.deleteSingleFaculty);

export const AcademicFacultyRoutes = router;
