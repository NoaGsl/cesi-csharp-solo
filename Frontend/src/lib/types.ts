export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  landlinePhoneNumber: string;
  mobilePhoneNumber: string;
  email: string;
  departmentId: number;
  locationId: number;
  department?: Department;
  location?: Location;
}

export interface IPagedResponse<T> {
  items: Array<T>;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface Department {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  city: string;
}