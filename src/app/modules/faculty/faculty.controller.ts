import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterableFields } from './faculty.constant';
import { FacultyService } from './faculty.service';

const createFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await FacultyService.createFacultyToDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  }
);

const getAllFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, facultyFilterableFields);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = await FacultyService.getAllFacultyToDB(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students Data Fetched',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await FacultyService.getSingleFacultyToDB(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty single data fatched successfully',
      data: result,
    });
  }
);

const deleteFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await FacultyService.deleteFacultyToDB(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty deleted successfully',
      data: result,
    });
  }
);

export const FacultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  deleteFaculty,
};
