"use client";

import { useEffect, useState } from "react";
import { IDepartment, IPagedResponse } from "@/lib/types";

interface EmployeeUpdateDepartmentProps {
  setSelectedDepartment: (department: IDepartment | null) => void;
  selectedDepartment: IDepartment | null;
}

const EmployeeUpdateDepartment = ({
  setSelectedDepartment,
  selectedDepartment,
}: EmployeeUpdateDepartmentProps) => {
  const [departments, setDepartments] =
    useState<IPagedResponse<IDepartment> | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const fetchLocations = async (search: string) => {
    try {
      const response = await fetch(`/api/departments?search=${search}`);
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLocations(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const selectLocation = (department: IDepartment) => {
    setSelectedDepartment(department);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (selectedDepartment && selectedDepartment.name !== value) {
      setSelectedDepartment(null);
    }
  };

  useEffect(() => {
    if (selectedDepartment) {
      setSearchTerm(selectedDepartment.name);
    }
  }, [selectedDepartment]);

  return (
    <div className="relative w-full pt-2">
      <input
        className="p-2 rounded border border-black w-full focus:outline-none focus:ring focus:ring-black"
        type="text"
        placeholder="Chercher un service"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
      />
      {showSuggestions && departments && departments.items.length > 0 && (
        <ul className="absolute bg-white border border-black p-2 max-h-24 overflow-y-auto rounded w-full z-10">
          {departments.items.map((department) => (
            <li
              key={department.id}
              onMouseDown={() => selectLocation(department)}
              className={`cursor-pointer ${
                selectedDepartment?.id === department.id ? "font-bold" : ""
              }`}
            >
              {department.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeeUpdateDepartment;
