import { AcademicDepartment } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicDepartmentFilterableFields } from './academicDepartment.constant';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AcademicDepartmentService.createaAademicDepartmentToDB(
      req.body
    );

    sendResponse<AcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department Created',
      data: result,
    });
  }
);

const getAllDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, AcademicDepartmentFilterableFields);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

    const result = await AcademicDepartmentService.getAllDepartmentFromDB(
      filters,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department Created',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AcademicDepartmentService.getSingleDepartmentToDB(
      req.params.id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department Single Data Find',
      data: result,
    });
  }
);

const deleteSingleDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AcademicDepartmentService.deleteSingleDepartmentToDB(
      req.params.id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department Single Data Deleted',
      data: result,
    });
  }
);

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllDepartment,
  getSingleDepartment,
  deleteSingleDepartment,
};
