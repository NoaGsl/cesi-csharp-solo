"use client";

import DepartmentFilter from "@/components/Department/DepartmentFilter";
import Input from "@/components/Forms/Input";
import LocationFilter from "@/components/Location/LocationFilter";
import { IEmployee } from "@/lib/types";
import { useEffect, useState } from "react";
import EmployeeUpdateForm from "./UpdateForm/EmployeeUpdateForm";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/AuthContext";

interface EmployeeDetailProps {
  id: string;
}

const EmployeeDetails = ({ id }: EmployeeDetailProps) => {
  const { isConnected } = useAuth();
  const [employee, setEmployee] = useState<IEmployee | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`/api/employees/${id}`);
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error("Erreur lors du chargement de l'employé:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/employees");
        toast.success("Employé supprimé avec succès");
        return;
      }

      const data = await response.json();

      if (response.status === 400 && data.errors) {
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
      if (data.ExceptionMessage) {
        toast.error(data.ExceptionMessage);
        return;
      }

      toast.error("Erreur lors de la supression de l'employé");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'employé:", error);
    }
  };

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Chargement...</p>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <main className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <button
          onClick={() => window.history.back()}
          className="fixed top-24 left-8 p-2 border-2 bg-white rounded-md hover:bg-gray-100 cursor-pointer"
        >
          Retour
        </button>
        <section className="bg-white mb-6 p-6 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">
            {employee.firstName} {employee.lastName}
          </h1>
          <p className="mb-2">
            <strong>Email:</strong> {employee.email}
          </p>
          <p className="mb-2">
            <strong>Tel fixe:</strong> {employee.mobilePhoneNumber}
          </p>
          <p className="mb-2">
            <strong>Tel mobile:</strong> {employee.landlinePhoneNumber}
          </p>
          <p className="mb-2">
            <strong>Service:</strong> {employee.department?.name}
          </p>
          <p className="mb-2">
            <strong>Site:</strong> {employee.location?.city}
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      {!editing && (
        <button
          onClick={() => window.history.back()}
          className="fixed top-24 left-8 p-2 border-2 bg-white rounded-md hover:bg-gray-100 cursor-pointer"
        >
          Retour
        </button>
      )}

      <div className="flex flex-col items-between justify-center">
        {editing && (
          <EmployeeUpdateForm
            defaultEmployee={employee}
            setEditing={setEditing}
            setDefaultEmployee={setEmployee}
          />
        )}

        {!editing && (
          <section className="bg-white mb-6 p-6 rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4">
              {employee.firstName} {employee.lastName}
            </h1>
            <p className="mb-2">
              <strong>Email:</strong> {employee.email}
            </p>
            <p className="mb-2">
              <strong>Tel fixe:</strong> {employee.mobilePhoneNumber}
            </p>
            <p className="mb-2">
              <strong>Tel mobile:</strong> {employee.landlinePhoneNumber}
            </p>
            <p className="mb-2">
              <strong>Service:</strong> {employee.department?.name}
            </p>
            <p className="mb-2">
              <strong>Site:</strong> {employee.location?.city}
            </p>
          </section>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => setEditing(!editing)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            {editing ? "Annuler" : "Modifier"}
          </button>

          {!editing && (
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Supprimer
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default EmployeeDetails;
