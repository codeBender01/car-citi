import { useState } from "react";
import Pagination from "@/components/Pagination";
import CarCard from "@/components/CarCard";
import { useGetSavedSearches } from "@/api/savedSearch/useGetSavedSearches";
import { useGetPosts } from "@/api/posts";
import type { SaveSearchRes } from "@/interfaces/savedSearch.interface";

const buildPostsFilters = (search: SaveSearchRes | undefined) => {
  if (!search) return {};
  return {
    carMarkId: search.carMarkId || undefined,
    carModelId: search.carModelId || undefined,
    regionId: search.regionId?.length ? search.regionId : undefined,
    cityId: search.cityId || undefined,
    driveTypeId: search.driveTypeId || undefined,
    transmissionId: search.transmissionId || undefined,
    carConditionId: search.carConditionId || undefined,
    subcategoryId: search.subcategoryId || undefined,
    yearFrom: search.yearFrom || undefined,
    yearTo: search.yearTo || undefined,
    priceFrom: search.priceFrom || undefined,
    priceTo: search.priceTo || undefined,
    mileageFrom: search.mileageFrom || undefined,
    mileageTo: search.mileageTo || undefined,
    colorId: search.colorId || undefined,
    characteristicIds: search.characteristicIds?.length
      ? search.characteristicIds
      : undefined,
    characteristicItemIds: search.characteristicItemIds?.length
      ? search.characteristicItemIds
      : undefined,
    vin: search.vin || undefined,
  };
};

const SavedSearch = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: searchesData, isLoading } = useGetSavedSearches();

  const searches = searchesData?.data?.rows || [];
  const selectedSearch = searches[0];

  const { data: postsData, isLoading: postsLoading } = useGetPosts({
    ...buildPostsFilters(selectedSearch),
    page: currentPage,
    pageSize: 6,
  });

  const posts = postsData?.data?.rows || [];
  const totalItems = postsData?.data?.count || 0;
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className="p-4 md:p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-6 md:mb-10">
        <div className="text-2xl md:text-[32px] font-bold">
          Сохранённый поиск
        </div>
      </div>

      <div className="rounded-2xl border border-headerBorder p-3 md:p-4">
        {isLoading ? (
          <div className="py-16 text-center">
            <p className="font-dm text-textGray text-base">Загрузка...</p>
          </div>
        ) : searches.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-dm text-textGray text-base">
              У вас пока нет сохранённых поисков
            </p>
          </div>
        ) : (
          <>
            {/* Posts grid */}
            {postsLoading ? (
              <div className="py-16 text-center">
                <p className="font-dm text-textGray text-base">
                  Загрузка объявлений...
                </p>
              </div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-7">
                {posts.map((car) => (
                  <CarCard car={car} key={car.id} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="font-dm text-textGray text-base">
                  Нет объявлений по данному поиску
                </p>
              </div>
            )}

            {/* Pagination */}
            {posts.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SavedSearch;
