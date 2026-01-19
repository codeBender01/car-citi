import CarCard from "@/components/CarCard";
import Pagination from "@/components/Pagination";
import { useState } from "react";

import { useGetFavorites } from "@/api/posts/useGetFavorites";

const Favorites = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: posts, isLoading } = useGetFavorites();

  const ITEMS_PER_PAGE = 6;
  const favorites = posts?.data?.rows || [];
  const totalItems = posts?.data?.count || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedFavorites = favorites.slice(startIndex, endIndex);

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-10">
        <div className="text-[32px] font-bold">Избранное</div>
      </div>

      <div className="rounded-2xl border border-headerBorder p-4">
        {isLoading ? (
          <div className="py-16 text-center">
            <p className="font-dm text-textGray text-base">Загрузка...</p>
          </div>
        ) : (
          <>
            <div className="mt-[50px] grid grid-cols-3 2xl:grid-cols-4 gap-7">
              {paginatedFavorites.map((favorite) => {
                return <CarCard car={favorite} key={favorite.id} />;
              })}
            </div>

            {/* Empty State */}
            {favorites.length === 0 && (
              <div className="py-16 text-center">
                <p className="font-dm text-textGray text-base">
                  У вас пока нет избранных автомобилей
                </p>
              </div>
            )}

            {/* Pagination */}
            {favorites.length > 0 && (
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

export default Favorites;
