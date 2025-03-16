"use client";

import DepartmentFilter from "../Department/DepartmentFilter";
import LocationFilter from "../Location/LocationFilter";
import EmployeeSearchFilter from "./EmployeeSearchFilter";

const EmployeeFiltersBar = () => {
  return (
    <div className="flex flex-col justify-center items-center md:flex-row gap-4">
      <EmployeeSearchFilter />
      <DepartmentFilter />
      <LocationFilter />
    </div>
  );
};

export default EmployeeFiltersBar;
