"use client";

import { IEmployee } from "@/lib/types";
import { useEffect, useState } from "react";

interface EmployeeDetailProps {
  id: string;
}

const EmployeeDetails = ({ id }: EmployeeDetailProps) => {
  const [employee, setEmployee] = useState<IEmployee | null>(null);

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

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Chargement...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <button
        onClick={() => window.history.back()}
        className="fixed top-8 left-8 p-2 border-2 bg-white rounded-md hover:bg-gray-100 cursor-pointer"
      >
        Retour
      </button>
      <section className="bg-white p-6 rounded shadow-md w-full max-w-md">
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
};

export default EmployeeDetails;
