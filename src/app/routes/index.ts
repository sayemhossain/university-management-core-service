import express from 'express';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { FacultyRoutes } from '../modules/faculty/faculty.routes';
import { StudentRoutes } from '../modules/student/student.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/academic-semesters',
    routes: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    routes: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    routes: AcademicDepartmentRoutes,
  },
  {
    path: '/students',
    routes: StudentRoutes,
  },
  {
    path: '/faculties',
    routes: FacultyRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
