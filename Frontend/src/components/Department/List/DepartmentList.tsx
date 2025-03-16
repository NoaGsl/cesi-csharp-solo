import { IDepartment, IPagedResponse } from "@/lib/types";
import InfiniteScrollObserver from "@/components/Shared/InfiniteScrollObserver";
import DepartmentQuickInformation from "./DepartmentQuickInformation";
import DepartmentQuickInformationExample from "./DepartmentQuickInformationExample";

interface DepartmentListProps {
  departments: IPagedResponse<IDepartment> | null;
  loading: boolean;
  loadMore: () => void;
  refreshDepartments: () => void;
}

const DepartmentList = ({ departments, loading, loadMore, refreshDepartments }: DepartmentListProps) => {
  return (
    <div className="w-8/10 md:w-9/10 lg:w-7/10 text-sm lg:text-base">
      <DepartmentQuickInformationExample />
      <div className="h-80 md:h-[650px] overflow-y-auto">
        {departments &&
          departments.items.map((department) => (
            <DepartmentQuickInformation key={department.id} department={department} refreshDepartments={refreshDepartments} />
          ))}

        {departments && departments.items.length === 0 && (
          <p className="text-xl text-center">Aucun service trouvé</p>
        )}

        <InfiniteScrollObserver onIntersect={loadMore} options={{ threshold: 0.5 }} />
        {loading && <p className="text-xl text-center">Recherche...</p>}
      </div>
    </div>
  );
};

export default DepartmentList;
