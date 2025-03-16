import { useAuth } from "@/hooks/AuthContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { isConnected } = useAuth();
  const router = useRouter();

  if (!isConnected) {
    return (
      <></>
    );
  }

  return (
    <header className="sticky top-0 flex z-50 flex-row justify-between w-full bg-blue-500 text-white p-4">
      <button
        onClick={() => router.push("/employees")}
        className="rounded-md bg-white text-blue-500 p-2 text-sm md:text-base cursor-pointer hover:bg-gray-200"
      >
        Employés
      </button>
      <button
        onClick={() => router.push("/admin/locations")}
        className="rounded-md bg-white text-blue-500 p-2 text-sm md:text-base cursor-pointer hover:bg-gray-200"
      >
        Sites
      </button>
      <button
        onClick={() => router.push("/admin/departments")}
        className="rounded-md bg-white text-blue-500 p-2 text-sm md:text-base cursor-pointer hover:bg-gray-200"
      >
        Services
      </button>
    </header>
  );
};

export default Header;
