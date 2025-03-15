import { ILocation, IPagedResponse } from "@/lib/types";
import InfiniteScrollObserver from "../Shared/InfiniteScrollObserver";
import LocationQuickInformationExample from "./LocationQuickInformationExample";
import LocationQuickInformation from "./LocationQuickInformation";

interface LocationListProps {
  locations: IPagedResponse<ILocation> | null;
  loading: boolean;
  loadMore: () => void;
  refreshLocations: () => void;
}

const LocationList = ({ locations, loading, loadMore, refreshLocations }: LocationListProps) => {
  return (
    <div className="w-8/10 md:w-9/10 lg:w-7/10 text-sm lg:text-base">
      <LocationQuickInformationExample />
      <div className="h-80 md:h-[650px] overflow-y-auto">
        {locations &&
          locations.items.map((location) => (
            <LocationQuickInformation key={location.id} location={location} refreshLocations={refreshLocations} />
          ))}

        {locations && locations.items.length === 0 && (
          <p className="text-xl text-center">Aucun site trouvé</p>
        )}

        <InfiniteScrollObserver onIntersect={loadMore} options={{ threshold: 0.5 }} />
        {loading && <p className="text-xl text-center">Recherche...</p>}
      </div>
    </div>
  );
};

export default LocationList;
