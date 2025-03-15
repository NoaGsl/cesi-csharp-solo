"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ILocation, IPagedResponse } from "@/lib/types";

const LocationFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [locations, setLocations] = useState<IPagedResponse<ILocation> | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const fetchLocations = async (search: string) => {
    try {
      const response = await fetch(`/api/locations?search=${search}`);
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error("Error fetching locations", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLocations(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const locationIdParam = searchParams.get("location_id");

    if (locationIdParam && locations && locations.items.length > 0) {
      const locationId = Number(locationIdParam);
      const location = locations.items.find((l) => l.id === locationId);

      if (location) {
        setSelectedLocation(location);
        setSearchTerm(location.city);
      }
    }
  }, [locations, searchParams]);

  const selectLocation = (location: ILocation) => {
    setSelectedLocation(location);
    setSearchTerm(location.city);

    const params = new URLSearchParams(searchParams.toString());
    params.set("location_id", location.id.toString());
    router.push(`${pathname}?${params.toString()}`);

    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (selectedLocation && selectedLocation.city !== value) {
      setSelectedLocation(null);

      const params = new URLSearchParams(searchParams.toString());
      params.delete("location_id");
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="relative w-full md:w-1/3 m-2">
      <input
        className="p-2 rounded border border-black w-full focus:outline-none focus:ring focus:ring-black"
        type="text"
        placeholder="Chercher dans un site"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
      />
      {showSuggestions && locations && locations.items.length > 0 && (
        <ul className="absolute bg-white border border-black p-2 max-h-24 overflow-y-auto rounded w-full z-10">
          {locations.items.map((location) => (
            <li
              key={location.id}
              onMouseDown={() => selectLocation(location)}
              className={`cursor-pointer ${
                selectedLocation?.id === location.id ? "font-bold" : ""
              }`}
            >
              {location.city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationFilter;
