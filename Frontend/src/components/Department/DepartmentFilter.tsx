"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IDepartment, IPagedResponse } from "@/lib/types";

const DepartmentFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [departments, setDepartments] =
    useState<IPagedResponse<IDepartment> | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] =
    useState<IDepartment | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const fetchDepartments = async (search: string) => {
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
      fetchDepartments(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const departmentIdParam = searchParams.get("department_id");

    if (departmentIdParam && departments && departments.items.length > 0) {
      const departmentId = Number(departmentIdParam);
      const department = departments.items.find((d) => d.id === departmentId);

      if (department) {
        setSelectedDepartment(department);
        setSearchTerm(department.name);
      }
    } else {
      setSelectedDepartment(null);
      setSearchTerm("");
    }
  }, [departments, searchParams]);

  const selectDepartment = (department: IDepartment) => {
    setSelectedDepartment(department);
    setSearchTerm(department.name);

    const params = new URLSearchParams(searchParams.toString());
    params.set("department_id", department.id.toString());
    router.push(`${pathname}?${params.toString()}`);

    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (selectedDepartment && selectedDepartment.name !== value) {
      setSelectedDepartment(null);

      const params = new URLSearchParams(searchParams.toString());
      params.delete("department_id");
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="relative w-full md:w-1/3 m-2">
      <input
        className="p-2 rounded border border-black w-full focus:outline-none focus:ring focus:ring-black"
        type="text"
        placeholder="Chercher dans un service"
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
              onMouseDown={() => selectDepartment(department)}
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

export default DepartmentFilter;
