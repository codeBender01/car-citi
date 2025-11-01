import CarCard from "@/components/CarCard";
import Pagination from "@/components/Pagination";
import { mockFavorites } from "./lib/mockFavorites";
import { useState } from "react";

const Favorites = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination constants
  const ITEMS_PER_PAGE = 6;
  const totalItems = mockFavorites.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Calculate paginated favorites
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedFavorites = mockFavorites.slice(startIndex, endIndex);

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-10">
        <div className="text-[32px] font-bold">Избранное</div>
        <p className="text-textSecondary text-base">
          Lorem ipsum dolor sit amet, consectetur.
        </p>
      </div>

      <div className="rounded-2xl border border-headerBorder p-4">
        <div className="mt-[50px] grid grid-cols-3 2xl:grid-cols-4 gap-7">
          {paginatedFavorites.map((favorite) => {
            return <CarCard key={favorite.id} />;
          })}
        </div>

        {/* Empty State */}
        {mockFavorites.length === 0 && (
          <div className="py-16 text-center">
            <p className="font-dm text-textGray text-base">
              У вас пока нет избранных автомобилей
            </p>
          </div>
        )}

        {/* Pagination */}
        {mockFavorites.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Favorites;
