import { IEmployee, IPagedResponse } from "@/lib/types";
import InfiniteScrollObserver from "../Shared/InfiniteScrollObserver";
import EmployeeQuickInformationExample from "./EmployeeQuickInformationExample";
import EmployeeQuickInformations from "./EmployeeQuickInformations";

interface EmployeeListProps {
  employees: IPagedResponse<IEmployee> | null;
  loading: boolean;
  loadMore: () => void;
}

const EmployeeList = ({ employees, loading, loadMore }: EmployeeListProps) => {
  return (
    <div className="w-8/10 md:w-9/10 lg:w-7/10 text-sm lg:text-base">
      <EmployeeQuickInformationExample />
      <div className="h-80 md:h-[650px] overflow-y-auto">
        {employees &&
          employees.items.map((employee) => (
            <EmployeeQuickInformations key={employee.id} employee={employee} />
          ))}

        {employees && employees.items.length === 0 && (
          <p className="text-xl text-center">Aucun employé trouvé</p>
        )}

        <InfiniteScrollObserver
          onIntersect={loadMore}
          options={{ threshold: 0.5 }}
        />
        {loading && <p className="text-xl text-center">Recherche...</p>}
      </div>
    </div>
  );
};

export default EmployeeList;
