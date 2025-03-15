"use client";

import EmployeeList from "@/components/Employee/EmployeeList";
import EmployeeFiltersBar from "@/components/Employee/EmployeeFiltersBar";
import { IEmployee, IPagedResponse } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const EmployeesPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Employees />
    </Suspense>
  );
};

const Employees = () => {
  const [employees, setEmployees] = useState<IPagedResponse<IEmployee> | null>(
    null
  );
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current filter values from the URL
  const search = searchParams.get("search") || "";
  const departmentId = searchParams.get("department_id") || "";
  const locationId = searchParams.get("location_id") || "";

  const loadMore = async () => {
    if (employees && page < employees.totalPages) {
      setLoading(true);
      const nextPage = page + 1;

      const response = await fetch(
        `/api/employees?page=${nextPage}&search=${search}&department_id=${departmentId}&location_id=${locationId}`
      );
      const data = await response.json();

      if (data && employees) {
        setEmployees({
          items: [...employees.items, ...data.items],
          currentPage: data.currentPage ?? 1,
          pageSize: data.pageSize ?? employees.pageSize,
          totalCount: data.totalCount ?? employees.totalCount,
          totalPages: data.totalPages ?? employees.totalPages,
        });
      }

      setPage(nextPage);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      const firstPage = 1;
      setLoading(true);
      setEmployees(null);
      setPage(firstPage);

      const response = await fetch(
        `/api/employees?page=${firstPage}&search=${search}&department_id=${departmentId}&location_id=${locationId}`
      );
      const data = await response.json();

      // Update URL with current search while preserving other filters
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", search);
      router.push(`${pathname}?${params.toString()}`);

      setEmployees(data);
      setLoading(false);
    };

    if (search.length === 0) {
      fetchEmployees();
    } else if (search.length >= 2) {
      const timeout = setTimeout(fetchEmployees, 500);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, departmentId, locationId]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold my-4">Liste des employés</h1>

      <EmployeeFiltersBar />

      <EmployeeList
        employees={employees}
        loading={loading}
        loadMore={loadMore}
      />
    </div>
  );
};

export default EmployeesPage;
