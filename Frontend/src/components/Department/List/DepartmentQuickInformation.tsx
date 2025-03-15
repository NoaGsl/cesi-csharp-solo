"use client";

import { IDepartment } from "@/lib/types";
import { useState } from "react";
import { toast } from "react-toastify";

interface DepartmentQuickInformationProps {
  department: IDepartment;
  refreshDepartments: () => void;
}

const DepartmentQuickInformation = ({ department, refreshDepartments }: DepartmentQuickInformationProps) => {
  const { id, name } = department;
  const [editing, setEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/departments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: updatedName }),
      });

      if (!response.ok) {
        throw new Error("Failed to update department");
      }

      setEditing(false);
      toast.success("Service mis à jour avec succès");
      refreshDepartments();
    } catch (error) {
      setEditing(false);
      toast.error("Erreur lors de la mise à jour du service");
    }
  };

  const deleteDepartment = async () => {
    try {
      const response = await fetch(`/api/departments/${id}`, {
        method: "DELETE",
      });

      if (response.status !== 200) {
        const data = await response.json();
        throw new Error(data.error);
      }

      toast.success("Service supprimé avec succès");
      refreshDepartments();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="bg-white border p-4 mb-4 rounded-xl w-full mx-auto text-xs md:text-base">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
        {editing ? (
          <form onSubmit={handleSubmit} className="gap-4 grid grid-cols-1 md:grid-cols-2 md:col-span-4">
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <button
              type="submit"
              className="w-full p-2 text-white bg-blue-500/85 hover:bg-blue-600 rounded-md cursor-pointer"
            >
              Enregistrer
            </button>
          </form>
        ) : (
          <p className="md:col-span-4 w-full truncate">{name}</p>
        )}

        <div className="w-full">
          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className="w-full p-2 text-white bg-blue-500/85 hover:bg-blue-600 rounded-md cursor-pointer"
          >
            {editing ? "Annuler" : "Modifier"}
          </button>
        </div>

        <div className="w-full">
          <button
            type="button"
            className="w-full p-2 text-white bg-red-500/85 hover:bg-red-600 rounded-md cursor-pointer"
            onClick={deleteDepartment}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentQuickInformation;
