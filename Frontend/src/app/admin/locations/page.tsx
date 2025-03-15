"use client";

import LocationList from "@/components/Location/LocationList";
import LocationListSearch from "@/components/Location/LocationListSearch";
import NewLocationForm from "@/components/Location/NewLocationForm";
import { ILocation, IPagedResponse } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense, useCallback } from "react";

const LocationsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Locations />
    </Suspense>
  );
};

const Locations = () => {
  const [locations, setLocations] = useState<IPagedResponse<ILocation> | null>(
    null
  );
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";

  const loadMore = async () => {
    if (locations && page < locations.totalPages) {
      setLoading(true);
      const nextPage = page + 1;

      const response = await fetch(
        `/api/locations?page=${nextPage}&search=${search}`
      );
      const data = await response.json();

      if (data && locations) {
        setLocations({
          items: [...locations.items, ...data.items],
          currentPage: data.currentPage ?? 1,
          pageSize: data.pageSize ?? locations.pageSize,
          totalCount: data.totalCount ?? locations.totalCount,
          totalPages: data.totalPages ?? locations.totalPages,
        });
      }

      setPage(nextPage);
      setLoading(false);
    }
  };

  const fetchLocations = useCallback(async () => {
    const firstPage = 1;
    setLoading(true);
    setLocations(null);
    setPage(firstPage);

    const response = await fetch(
      `/api/locations?page=${firstPage}&search=${search}`
    );
    const data = await response.json();

    const params = new URLSearchParams(searchParams.toString());
    params.set("search", search);
    router.push(`${pathname}?${params.toString()}`);

    setLocations(data);
    setLoading(false);
  }, [search, searchParams, pathname, router]);

  useEffect(() => {
    if (search.length === 0) {
      fetchLocations();
    } else if (search.length >= 2) {
      const timeout = setTimeout(fetchLocations, 500);
      return () => clearTimeout(timeout);
    }
  }, [search, fetchLocations]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold my-4">Liste des sites</h1>
      <div className="flex flex-col md:flex-row items-center justify-between w-8/10 md:w-9/10 lg:w-7/10 text-sm lg:text-base">
        <LocationListSearch />
        <NewLocationForm RefreshLocations={() => fetchLocations()} />
      </div>

      <LocationList
        locations={locations}
        loading={loading}
        loadMore={loadMore}
        refreshLocations={fetchLocations}
      />
    </div>
  );
};

export default LocationsPage;
