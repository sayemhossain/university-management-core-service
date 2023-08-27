import { Faculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { facultySearchableFields } from './faculty.constant';
import { IFacultyFilters } from './faculty.interface';

const createFacultyToDB = async (data: Faculty) => {
  const result = await prisma.faculty.create({
    data,
  });

  return result;
};

const getAllFacultyToDB = async (
  filters: IFacultyFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Faculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: facultySearchableFields.map(field => ({
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

  const whereConditions: Prisma.FacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.faculty.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.faculty.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleFacultyToDB = async (id: string) => {
  const result = await prisma.faculty.findUnique({ where: { id } });

  return result;
};

const deleteFacultyToDB = async (id: string) => {
  const result = await prisma.faculty.findUnique({ where: { id } });

  return result;
};

export const FacultyService = {
  createFacultyToDB,
  getAllFacultyToDB,
  getSingleFacultyToDB,
  deleteFacultyToDB,
};
