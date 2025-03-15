export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  landlinePhoneNumber: string;
  mobilePhoneNumber: string;
  email: string;
  departmentId: number;
  locationId: number;
  department?: IDepartment;
  location?: ILocation;
}

export interface IPagedResponse<T> {
  items: Array<T>;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface IDepartment {
  id: number;
  name: string;
}

export interface ILocation {
  id: number;
  city: string;
}