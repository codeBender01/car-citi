import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { FiTrash2 } from "react-icons/fi";
import { useGetSavedSearches } from "@/api/savedSearch/useGetSavedSearches";
import { useDeleteSavedSearch } from "@/api/savedSearch/useDeleteSavedSearch";
import { useToast } from "@/hooks/use-toast";
import { BASE_URL } from "@/api";
import type { SavedSearchItem } from "@/interfaces/savedSearch.interface";

const SavedSearchCard = ({
  item,
  onDelete,
}: {
  item: SavedSearchItem;
  onDelete: (id: string) => void;
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const search = item.savedSearche;

  const filters: string[] = [];
  if (search.yearFrom || search.yearTo) {
    const from = search.yearFrom || "...";
    const to = search.yearTo || "...";
    filters.push(`${t("savedSearch.year")}: ${from} — ${to}`);
  }
  if (search.priceFrom || search.priceTo) {
    const from = search.priceFrom ?? "...";
    const to = search.priceTo ?? "...";
    filters.push(`${t("savedSearch.price")}: ${from} — ${to}`);
  }
  if (search.mileageFrom || search.mileageTo) {
    const from = search.mileageFrom ?? "...";
    const to = search.mileageTo ?? "...";
    filters.push(`${t("savedSearch.mileage")}: ${from} — ${to}`);
  }

  return (
    <div
      onClick={() => navigate(`/dashboard/saved-search/${search.id}`)}
      className="flex items-center gap-4 rounded-2xl border border-headerBorder p-4 cursor-pointer hover:bg-mainBg transition-colors"
    >
      {search.carmark?.logo?.url && (
        <img
          src={`${BASE_URL}/${search.carmark.logo.url}`}
          alt={search.carmark.name}
          className="w-12 h-12 object-contain rounded-lg flex-shrink-0"
        />
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-dm font-semibold text-textSecondary text-base truncate">
            {search.carmark?.name || t("savedSearch.allBrands")}
          </span>
          <span className="text-xs text-white bg-primary rounded-full px-2 py-0.5 flex-shrink-0">
            {item.count} {t("savedSearch.vehicles")}
          </span>
        </div>

        {filters.length > 0 && (
          <p className="text-sm text-textGray truncate">
            {filters.join(" · ")}
          </p>
        )}

        <p className="text-xs text-textGray mt-1">
          {dayjs(search.created).format("DD.MM.YYYY, HH:mm")}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(search.id);
        }}
        className="p-2 hover:bg-white rounded-lg transition-colors text-textGray hover:text-danger flex-shrink-0"
      >
        <FiTrash2 size={18} />
      </button>
    </div>
  );
};

const SavedSearch = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { data: searchesData, isLoading } = useGetSavedSearches();
  const searches = searchesData?.data?.rows || [];

  const deleteSavedSearch = useDeleteSavedSearch();

  const handleDelete = async (id: string) => {
    try {
      await deleteSavedSearch.mutateAsync(id);
      toast({
        title: t("savedSearch.deleted"),
        variant: "success",
      });
    } catch {
      toast({
        title: t("savedSearch.deleteError"),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 md:p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-6 md:mb-10">
        <div className="text-2xl md:text-[32px] font-bold">
          {t("savedSearch.title")}
        </div>
      </div>

      {isLoading ? (
        <div className="py-16 text-center">
          <p className="font-dm text-textGray text-base">
            {t("savedSearch.loading")}
          </p>
        </div>
      ) : searches.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-dm text-textGray text-base">
            {t("savedSearch.noSearches")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {searches.map((item) => (
            <SavedSearchCard
              key={item.savedSearche.id}
              item={item}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedSearch;
