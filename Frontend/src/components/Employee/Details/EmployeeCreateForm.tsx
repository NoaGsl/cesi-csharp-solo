"use client";

import Input from "@/components/Forms/Input";
import { IDepartment, IEmployee, ILocation } from "@/lib/types";
import { useState } from "react";
import { toast } from "react-toastify";
import EmployeeUpdateDepartment from "./UpdateForm/EmployeeUpdateDepartment";
import EmployeeUpdateLocation from "./UpdateForm/EmployeeUpdateLocation";
import { useRouter } from "next/navigation";

const initialEmployee: IEmployee = {
  id: 0,
  firstName: "",
  lastName: "",
  landlinePhoneNumber: "",
  mobilePhoneNumber: "",
  email: "",
  isAdmin: false,
  departmentId: 0,
  locationId: 0,
};

const EmployeeCreateForm = () => {
  const [employee, setEmployee] = useState<IEmployee>(initialEmployee);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (response.status === 200) {
        toast.success("Employé créé avec succès");
        setEmployee(initialEmployee);
        router.push("/employees");
        return;
      }

      const data = await response.json();

      // DTO validation errors are returned as a 400 status code
      if (response.status === 400) {
        Object.values(data.errors as { [key: string]: string[] }).forEach(
          (messages: string[]) => {
            messages.forEach((message: string) => {
              toast.error(message);
            });
          }
        );
        return;
      }

      // Custom error message from the api
      if (response.status === 404) {
        toast.error(data.ExceptionMessage);
        return;
      }

      if (response.status === 500 && data.ExceptionMessage) {
        toast.error(data.ExceptionMessage);
        return;
      }

      // Server error
      throw new Error(data.error);

    } catch (error) {
      console.log("Erreur lors de la création de l'employé:", error);
      toast.error("Erreur lors de la création de l'employé");
    }
  };

  const updateSelectedLocation = (location: ILocation | null) => {
    setEmployee({
      ...employee,
      location: location ?? undefined,
      locationId: location?.id ?? 0,
    });
  };

  const updateSelectedDepartment = (department: IDepartment | null) => {
    setEmployee({
      ...employee,
      department: department ?? undefined,
      departmentId: department?.id ?? 0,
    });
  };

  return (
    <section className="bg-white mb-6 p-6 rounded shadow-md h-full w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4">Créer un employé</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            label="Prénom"
            id="firstName"
            placeholder="Prénom"
            value={employee.firstName}
            required
            onChange={(e) =>
              setEmployee({ ...employee, firstName: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <Input
            label="Nom"
            id="lastName"
            placeholder="Nom"
            value={employee.lastName}
            required
            onChange={(e) =>
              setEmployee({ ...employee, lastName: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="Email"
            value={employee.email}
            required
            onChange={(e) =>
              setEmployee({ ...employee, email: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <Input
            label="Tel fixe"
            id="landlinePhoneNumber"
            type="tel"
            placeholder="Tel fixe"
            value={employee.landlinePhoneNumber}
            required
            onChange={(e) =>
              setEmployee({
                ...employee,
                landlinePhoneNumber: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4">
          <Input
            label="Tel mobile"
            id="mobilePhoneNumber"
            type="tel"
            placeholder="Tel mobile"
            value={employee.mobilePhoneNumber}
            required
            onChange={(e) =>
              setEmployee({
                ...employee,
                mobilePhoneNumber: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4 w-full items-center">
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700"
          >
            Service
          </label>
          <EmployeeUpdateDepartment
            selectedDepartment={employee.department ?? null}
            setSelectedDepartment={updateSelectedDepartment}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Site
          </label>
          <EmployeeUpdateLocation
            selectedLocation={employee.location ?? null}
            setSelectedLocation={updateSelectedLocation}
          />
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            id="isAdmin"
            checked={employee.isAdmin}
            onChange={(e) =>
              setEmployee({ ...employee, isAdmin: e.target.checked })
            }
          />
          <label htmlFor="isAdmin" className="ml-2 font-medium text-gray-700">
            Administrateur
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Créer
        </button>
      </form>
    </section>
  );
};

export default EmployeeCreateForm;
