"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const EmployeeSearchFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full md:w-1/3 m-2">
      <input
        className="p-2 rounded border border-black w-full focus:outline-none focus:ring focus:ring-black"
        type="text"
        placeholder="Rechercher un employé..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default EmployeeSearchFilter;
