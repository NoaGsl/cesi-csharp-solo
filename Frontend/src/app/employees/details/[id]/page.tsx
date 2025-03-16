import EmployeeDetails from "@/components/Employee/Details/EmployeeDetails";

interface EmployeeDetailProps {
  params: Promise<{ id: string }>;
}

const EmployeeDetailPage = async ({ params }: EmployeeDetailProps) => {
  const { id } = await params;

  return <EmployeeDetails id={id} />;
};

export default EmployeeDetailPage;
