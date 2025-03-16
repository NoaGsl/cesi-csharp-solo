"use client";

import { useEffect, useState } from "react";
import { ILocation, IPagedResponse } from "@/lib/types";

interface EmployeeUpdateLocationProps {
  setSelectedLocation: (location: ILocation | null) => void;
  selectedLocation: ILocation | null;
}

const EmployeeUpdateLocation = ({
  setSelectedLocation,
  selectedLocation,
}: EmployeeUpdateLocationProps) => {
  const [locations, setLocations] =
    useState<IPagedResponse<ILocation> | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
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

  const selectLocation = (location: ILocation) => {
    setSelectedLocation(location);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (selectedLocation && selectedLocation.city !== value) {
      setSelectedLocation(null);
    }
  };

  useEffect(() => {
    if (selectedLocation) {
      setSearchTerm(selectedLocation.city);
    }
  }, [selectedLocation]);

  return (
    <div className="relative w-full pt-2">
      <input
        className="p-2 rounded border border-black w-full focus:outline-none focus:ring focus:ring-black"
        type="text"
        placeholder="Chercher un site"
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

export default EmployeeUpdateLocation;
