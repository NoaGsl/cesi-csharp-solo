"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ILocation } from "@/lib/types";

const LocationFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [locations, setLocations] = useState<ILocation[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const fetchLocations = async (search: string) => {
    try {
      const response = await fetch(`/api/locations?search=${search}`);
      const data = await response.json();
      setLocations(data.items || data);
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

    if (locationIdParam && locations.length > 0) {
      const locId = Number(locationIdParam);
      const loc = locations.find((l) => l.id === locId);

      if (loc) {
        setSelectedLocation(loc);
        setSearchTerm(loc.city);
      }
    }
  }, [locations, searchParams]);

  const selectLocation = (loc: ILocation) => {
    setSelectedLocation(loc);
    setSearchTerm(loc.city);

    const params = new URLSearchParams(searchParams.toString());
    params.set("location_id", loc.id.toString());
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
        placeholder="Chercher dans une ville"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
      />
      {showSuggestions && locations.length > 0 && (
        <ul className="absolute bg-white border border-black p-2 max-h-24 overflow-y-auto rounded w-full z-10">
          {locations.map((loc) => (
            <li
              key={loc.id}
              onMouseDown={() => selectLocation(loc)}
              className={`cursor-pointer ${
                selectedLocation?.id === loc.id ? "font-bold" : ""
              }`}
            >
              {loc.city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationFilter;
