import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoChevronBack } from "react-icons/io5";
import Pagination from "@/components/Pagination";
import CarCard from "@/components/CarCard";
import { useGetSavedSearches } from "@/api/savedSearch/useGetSavedSearches";
import { useGetPosts } from "@/api/posts";
import { buildPostsFilters } from "../lib/buildPostsFilters";

const ITEMS_PER_PAGE = 6;

const SavedSearchResults = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: searchesData, isLoading } = useGetSavedSearches();
  const searches = searchesData?.data?.rows || [];
  const searchItem = searches.find((s) => s.savedSearche.id === id);
  const selectedSearch = searchItem?.savedSearche;

  const { data: postsData, isLoading: postsLoading } = useGetPosts({
    ...buildPostsFilters(selectedSearch),
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
  });

  const posts = postsData?.data?.rows || [];
  const totalItems = postsData?.data?.count || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className="p-4 md:p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-6 md:mb-10">
        <button
          onClick={() => navigate("/dashboard/saved-search")}
          className="flex items-center gap-1 text-sm text-textGray hover:text-textSecondary transition-colors mb-4"
        >
          <IoChevronBack size={16} />
          {t("savedSearch.back")}
        </button>
        <div className="text-2xl md:text-[32px] font-bold">
          {t("savedSearch.results")}
          {selectedSearch?.carmark?.name && (
            <span className="text-primary"> — {selectedSearch.carmark.name}</span>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-headerBorder p-3 md:p-4">
        {isLoading || postsLoading ? (
          <div className="py-16 text-center">
            <p className="font-dm text-textGray text-base">
              {t("savedSearch.loadingResults")}
            </p>
          </div>
        ) : !selectedSearch ? (
          <div className="py-16 text-center">
            <p className="font-dm text-textGray text-base">
              {t("savedSearch.noSearches")}
            </p>
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-7">
              {posts.map((car) => (
                <CarCard car={car} key={car.id} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className="py-16 text-center">
            <p className="font-dm text-textGray text-base">
              {t("savedSearch.noResults")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedSearchResults;
