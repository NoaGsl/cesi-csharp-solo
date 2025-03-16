"use client";

import { useState } from "react";
import { toast } from "react-toastify";

interface NewLocationFormProps {
  RefreshLocations: () => void;
}

const NewLocationForm = ({ RefreshLocations }: NewLocationFormProps) => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
      });

      const data = await response.json();

      // DTO validation errors are returned as a 400 status code
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

      if (response.status === 200) {
        setCity("");
        RefreshLocations();
        toast.success("Site ajouté avec succès");
        return;
      }

      throw new Error("Erreur lors de l'ajout du service");
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justtify-end flex-col md:flex-row w-full md:w-1/3 mb-4 md:mb-0"
    >
      <input
        type="text"
        id="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full mb-2 md:mb-0 mr-0 md:mr-2 focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Ville à ajouter"
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

export default NewLocationForm;
