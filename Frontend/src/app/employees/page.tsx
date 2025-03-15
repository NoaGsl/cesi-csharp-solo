"use client";

import EmployeeList from "@/components/Employee/EmployeeList";
import { IEmployee, IPagedResponse } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Suspense } from "react";


const EmployeesPage = () => {
  return (
    // Had an issue with the build, so I added a Suspense component
    <Suspense fallback={<div>Chargement...</div>}>
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
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const loadMore = async () => {
    if (employees && page < employees.totalPages) {
      setLoading(true);
      const nextPage = page + 1;

      const response = await fetch(
        `/api/employees?page=${nextPage}&search=${search}`
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
        `/api/employees?page=${firstPage}&search=${search}`
      );
      const data = await response.json();

      const queryString = createQueryString("search", search);
      router.push(`${pathname}?${queryString}`);

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
  }, [search]);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Chercher un employé..."
        className="w-8/10 md:w-9/10 lg:w-7/10 p-2 my-4 focus:border-black focus:outline-none border border-gray-300 rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h1 className="text-2xl font-bold mb-4">Employés</h1>
      <EmployeeList
        employees={employees}
        loading={loading}
        loadMore={loadMore}
      />
    </div>
  );
};

export default EmployeesPage;
