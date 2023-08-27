import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constant';
import { StudentService } from './student.service';

const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await StudentService.createStudentToDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  }
);

const getAllStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, studentFilterableFields);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

    const result = await StudentService.getAllStudentToDB(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students Data Fetched',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await StudentService.getSingleStudentToDB(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student single data fatched successfully',
      data: result,
    });
  }
);

const updateStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await StudentService.updateStudentToDB(
      req.params.id,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students Data Updated',
      data: result,
    });
  }
);

const deleteStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await StudentService.deleteStudentToDB(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  }
);

export const StudentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
