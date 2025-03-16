"use client";

import { IEmployee } from "@/lib/types";
import { useRouter } from "next/navigation";

const EmployeeQuickInformations = ({ employee }: { employee: IEmployee }) => {
  const {
    id,
    firstName,
    lastName,
    landlinePhoneNumber,
    mobilePhoneNumber,
    email,
  } = employee;

  const router = useRouter();

  const handleClick = () => {
    router.push(`/employees/details/${id}`);
  };

  return (
    <div
      onClick={() => handleClick()}
      className="bg-white border p-4 mb-4 rounded-xl w-full mx-auto cursor-pointer hover:shadow-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <p className="truncate">
          {firstName} {lastName}
        </p>
        <p className="">{landlinePhoneNumber}</p>
        <p className="">{mobilePhoneNumber}</p>
        <p className="truncate">{email}</p>
      </div>
    </div>
  );
};

export default EmployeeQuickInformations;
