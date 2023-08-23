import { AcademicFaculty } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyFilterableFields } from './academicFaculty.constant';
import { AcademicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AcademicFacultyService.createAcademicFacultyToDB(
      req.body
    );

    sendResponse<AcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty Created',
      data: result,
    });
  }
);

const getAllFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, AcademicFacultyFilterableFields);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

    const result = await AcademicFacultyService.getAllFacultyFromDB(
      filters,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty Created',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AcademicFacultyService.getSingleFacultyToDB(
      req.params.id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty Single Data Find',
      data: result,
    });
  }
);

const deleteSingleFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AcademicFacultyService.deleteSingleFacultyToDB(
      req.params.id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty Single Data Deleted',
      data: result,
    });
  }
);

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllFaculty,
  getSingleFaculty,
  deleteSingleFaculty,
};
