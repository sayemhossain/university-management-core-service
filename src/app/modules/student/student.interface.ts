export type IName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type IStudent = {
  id: string;
  name: IName;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  email: string;
  contactNo: string;
  profileImage: string;
  academicFaculty: {
    syncId: string;
  };
  academicDepartment: {
    syncId: string;
  };
  academicSemester: {
    syncId: string;
  };
};

export type IStudentFilters = {
  searchTerm?: string | undefined;
  academicFacultyId?: string | undefined;
  academicDepartmentId?: string | undefined;
  academicSemesterId?: string | undefined;
  studentId?: string | undefined;
  email?: string | undefined;
  contactNo?: string | undefined;
  gender?: string | undefined;
  bloodGroup?: string | undefined;
};
