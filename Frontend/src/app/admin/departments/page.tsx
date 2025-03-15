"use client";

import DepartmentList from "@/components/Department/List/DepartmentList";
import DepartmentListSearch from "@/components/Department/List/DepartmentListSearch";
import NewDepartmentForm from "@/components/Department/NewDepartmentForm";
import { IDepartment, IPagedResponse } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense, useCallback } from "react";

const DepartmentsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Departments />
    </Suspense>
  );
};

const Departments = () => {
  const [departments, setDepartments] = useState<IPagedResponse<IDepartment> | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";

  const loadMore = async () => {
    if (departments && page < departments.totalPages) {
      setLoading(true);
      const nextPage = page + 1;

      const response = await fetch(`/api/departments?page=${nextPage}&search=${search}`);
      const data = await response.json();

      if (data && departments) {
        setDepartments({
          items: [...departments.items, ...data.items],
          currentPage: data.currentPage ?? 1,
          pageSize: data.pageSize ?? departments.pageSize,
          totalCount: data.totalCount ?? departments.totalCount,
          totalPages: data.totalPages ?? departments.totalPages,
        });
      }

      setPage(nextPage);
      setLoading(false);
    }
  };

  const fetchDepartments = useCallback(async () => {
    const firstPage = 1;
    setLoading(true);
    setDepartments(null);
    setPage(firstPage);

    const response = await fetch(`/api/departments?page=${firstPage}&search=${search}`);
    const data = await response.json();

    const params = new URLSearchParams(searchParams.toString());
    params.set("search", search);
    router.push(`${pathname}?${params.toString()}`);

    setDepartments(data);
    setLoading(false);
  }, [search, searchParams, pathname, router]);

  useEffect(() => {
    if (search.length === 0) {
      fetchDepartments();
    } else if (search.length >= 2) {
      const timeout = setTimeout(fetchDepartments, 500);
      return () => clearTimeout(timeout);
    }
  }, [search, fetchDepartments]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold my-4">Liste des services</h1>
      <div className="flex flex-col md:flex-row items-center justify-between w-8/10 md:w-9/10 lg:w-7/10 text-sm lg:text-base">
        <DepartmentListSearch />
        <NewDepartmentForm RefreshDepartments={() => fetchDepartments()} />
      </div>

      <DepartmentList
        departments={departments}
        loading={loading}
        loadMore={loadMore}
        refreshDepartments={fetchDepartments}
      />
    </div>
  );
};

export default DepartmentsPage;
