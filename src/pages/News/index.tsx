import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetNews } from "@/api/news/useGetNews";
import { BASE_URL } from "@/api";
import { formatNewsDate } from "@/lib/dateUtils";
import Pagination from "@/components/Pagination";
import type { OneNews, OneNewsCategory } from "@/interfaces/news.interface";

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const { data: newsResponse, isLoading } = useGetNews();
  const newsData = newsResponse?.data?.rows || [];

  const ITEMS_PER_PAGE = 12;
  const totalItems = newsData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedNews = newsData.slice(startIndex, endIndex);

  const getLocalizedTitle = (news: OneNews): string => {
    return i18n.language === "tk" ? news.titleTk : news.titleRu;
  };

  const getLocalizedCategory = (category: OneNewsCategory): string => {
    return i18n.language === "tk" ? category.nameTk : category.nameRu;
  };

  const NewsCard = ({ item }: { item: OneNews }) => (
    <div
      onClick={() => navigate(`/news/${item.id}`)}
      className="font-dm cursor-pointer hover:opacity-90 transition-opacity"
    >
      <div className="relative">
        <img
          src={`${BASE_URL}/${item.image.url}`}
          alt={getLocalizedTitle(item)}
          className="rounded-2xl object-cover w-full h-[250px]"
        />
        {item.categories && item.categories.length > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-primary text-white rounded-4xl text-sm px-2 py-1 font-dm">
            {getLocalizedCategory(item.categories[0])}
          </div>
        )}
      </div>

      <div className="mt-3 font-dm text-sm text-textGray">
        {formatNewsDate(item.created, i18n.language)}
      </div>
      <div className="mt-3 text-[20px] font-medium text-textPrimary line-clamp-2">
        {getLocalizedTitle(item)}
      </div>
    </div>
  );

  return (
    <div className="pt-[160px] pb-20 px-4 md:px-12 2xl:px-[118px]">
      {/* Breadcrumb */}
      <div className="font-dm text-[15px] flex gap-1 mb-5">
        <Link to="/home" className="text-primary hover:underline">
          Домашняя страница
        </Link>{" "}
        / <span>Новости</span>
      </div>

      {/* Title */}
      <h1 className="font-rale text-3xl md:text-[40px] font-bold text-textPrimary mb-8">
        Все новости
      </h1>

      {isLoading ? (
        <div className="py-16 text-center">
          <p className="font-dm text-textGray text-lg">Загрузка новостей...</p>
        </div>
      ) : newsData.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-headerBorder">
          <p className="font-dm text-textGray text-lg">
            Нет доступных новостей
          </p>
        </div>
      ) : (
        <>
          {/* News Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-7">
            {paginatedNews.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>

          {/* Pagination */}
          {newsData.length > ITEMS_PER_PAGE && (
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
    </div>
  );
};

export default News;
