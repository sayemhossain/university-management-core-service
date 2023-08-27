import { Prisma, Student } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { studentSearchableFields } from './student.constant';
import { IStudentFilters } from './student.interface';

const createStudentToDB = async (data: Student) => {
  const result = await prisma.student.create({
    data,
    include: {
      academicFaculty: true,
      academicDepartment: true,
      academicSemester: true,
    },
  });
  return result;
};

const getAllStudentToDB = async (
  filters: IStudentFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: studentSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.student.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.student.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleStudentToDB = async (id: string) => {
  const result = await prisma.student.findUnique({ where: { id } });

  return result;
};

const deleteStudentToDB = async (id: string) => {
  const result = await prisma.student.delete({ where: { id } });

  return result;
};

export const StudentService = {
  createStudentToDB,
  getAllStudentToDB,
  getSingleStudentToDB,
  deleteStudentToDB,
};
