import CarCard from "@/components/CarCard";
import Pagination from "@/components/Pagination";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetFavorites } from "@/api/posts/useGetFavorites";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";

const Saved = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: posts, isLoading } = useGetFavorites();
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 12;
  const favorites = posts?.data?.rows || [];
  const totalItems = posts?.data?.count || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedFavorites = favorites.slice(startIndex, endIndex);

  return (
    <div className="pt-[160px] pb-20 px-4 md:px-12 2xl:px-[118px]">
      <div className="flex items-center gap-4 mb-8">
        <Button
          onClick={() => navigate(-1)}
          size="none"
          className="bg-transparent border border-gray-300 text-textPrimary hover:bg-gray-100 transition-colors rounded-xl p-3"
        >
          <IoArrowBack className="w-5 h-5" />
        </Button>
        <h1 className="font-rale text-3xl md:text-[40px] font-bold text-textPrimary">
          Сохраненные автомобили
        </h1>
      </div>

      {isLoading ? (
        <div className="py-16 text-center">
          <p className="font-dm text-textGray text-base">Загрузка...</p>
        </div>
      ) : (
        <>
          {/* Empty State */}
          {favorites.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-2xl border border-headerBorder">
              <p className="font-dm text-textGray text-lg mb-4">
                У вас пока нет сохраненных автомобилей
              </p>
              <Button
                onClick={() => navigate("/all-cars")}
                size="none"
                className="bg-primary text-white font-dm text-[15px] cursor-pointer rounded-xl py-4 px-6 hover:opacity-90 transition-opacity"
              >
                Посмотреть все автомобили
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-7">
                {paginatedFavorites.map((favorite) => {
                  return <CarCard car={favorite} key={favorite.id} />;
                })}
              </div>

              {/* Pagination */}
              {favorites.length > ITEMS_PER_PAGE && (
                <div className="mt-10">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Saved;
