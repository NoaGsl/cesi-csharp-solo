import Input from "@/components/Forms/Input";
import { IDepartment, IEmployee, ILocation } from "@/lib/types";
import { useState } from "react";
import { toast } from "react-toastify";
import EmployeeUpdateDepartment from "./EmployeeUpdateDepartment";
import EmployeeUpdateLocation from "./EmployeeUpdateLocation";

interface EmployeeUpdateFormProps {
  defaultEmployee: IEmployee;
  setEditing: (editing: boolean) => void;
  setDefaultEmployee: (employee: IEmployee) => void;
}

const EmployeeUpdateForm = ({
  defaultEmployee,
  setEditing,
  setDefaultEmployee,
}: EmployeeUpdateFormProps) => {
  const [employee, setEmployee] = useState<IEmployee>(defaultEmployee);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/employees/${employee.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        toast.success("Employé mis à jour avec succès");
        setDefaultEmployee(employee);
        setEditing(false);
      } else {
        toast.error("Erreur lors de la mise à jour de l'employé");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'employé:", error);
    }
  };

  const UpdateSelectedLocation = (location: ILocation | null) => {
    setEmployee({
      ...employee,
      location: location ?? undefined,
      locationId: location?.id ?? employee.locationId,
    });
  };

  const UpdateSelectedDepartment = (department: IDepartment | null) => {
    setEmployee({
      ...employee,
      department: department ?? undefined,
      departmentId: department?.id ?? employee.departmentId,
    });
  };

  return (
    <section className="bg-white mb-6 p-6 rounded shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4">Modifier l'employé</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            label="Prénom"
            id="firstName"
            placeholder="Prénom"
            value={employee.firstName}
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
            setSelectedDepartment={UpdateSelectedDepartment}
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
            setSelectedLocation={UpdateSelectedLocation}
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
          <label
            htmlFor="isAdmin"
            className="ml-2 font-medium text-gray-700"
          >
            {" "}
            Administrateur
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Enregistrer
        </button>
      </form>
    </section>
  );
};

export default EmployeeUpdateForm;
