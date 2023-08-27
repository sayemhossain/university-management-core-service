import { AcademicDepartment, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { AcademicDepartmentFilterableFields } from './academicDepartment.constant';
import { IAcademicDepartmentFilters } from './academicDepartment.interface';

const createaAademicDepartmentToDB = async (
  data: AcademicDepartment
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.create({
    data,
  });
  return result;
};

const getAllDepartmentFromDB = async (
  filters: IAcademicDepartmentFilters,
  options: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: AcademicDepartmentFilterableFields.map(field => ({
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

  const whereConditions: Prisma.AcademicDepartmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicDepartment.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.academicDepartment.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleDepartmentToDB = async (id: string) => {
  const result = await prisma.academicDepartment.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const deleteSingleDepartmentToDB = async (id: string) => {
  const result = await prisma.academicDepartment.delete({
    where: {
      id,
    },
  });

  return result;
};

export const AcademicDepartmentService = {
  createaAademicDepartmentToDB,
  getAllDepartmentFromDB,
  getSingleDepartmentToDB,
  deleteSingleDepartmentToDB,
};
