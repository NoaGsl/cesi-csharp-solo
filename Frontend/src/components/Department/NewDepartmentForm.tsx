"use client";

import { useState } from "react";
import { toast } from "react-toastify";

interface NewDepartmentFormProps {
  RefreshDepartments: () => void;
}

const NewDepartmentForm = ({ RefreshDepartments }: NewDepartmentFormProps) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Failed to add new department");
      }

      setName("");
      RefreshDepartments();
      toast.success("Département ajouté avec succès");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-end flex-col md:flex-row w-full md:w-1/3 mb-4 md:mb-0"
    >
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full mb-2 md:mb-0 mr-0 md:mr-2 focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Nom du service à ajouter"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer p-0 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        {loading ? "Ajout..." : "Ajouter"}
      </button>
    </form>
  );
};

export default NewDepartmentForm;
