import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetNewsById } from "@/api/news/useGetNewsById";
import { BASE_URL } from "@/api";
import { formatNewsDate } from "@/lib/dateUtils";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const { data: newsResponse, isLoading, isError } = useGetNewsById(id!);
  const news = newsResponse?.data;

  if (isLoading) {
    return (
      <div className="pt-[100px] pb-20 px-4 md:px-12 2xl:px-[118px]">
        <div className="flex justify-center items-center py-20">
          <p className="font-dm text-textGray text-lg">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (isError || !news) {
    return (
      <div className="pt-[160px] pb-20 px-4 md:px-12 2xl:px-[118px]">
        <div className="flex flex-col items-center justify-center py-20">
          <p className="font-dm text-textGray text-lg mb-4">
            Новость не найдена
          </p>
          <Button
            onClick={() => navigate(-1)}
            size="none"
            className="bg-primary text-white font-dm text-[15px] cursor-pointer rounded-xl py-4 px-6"
          >
            Вернуться назад
          </Button>
        </div>
      </div>
    );
  }

  const title = i18n.language === "tk" ? news.titleTk : news.titleRu;
  const description =
    i18n.language === "tk" ? news.descriptionTk : news.descriptionRu;

  return (
    <div className="pt-[160px] pb-20 px-4 md:px-12 2xl:px-[118px]">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          size="none"
          className="bg-transparent border border-gray-300 text-textPrimary hover:bg-gray-100 transition-colors rounded-xl p-3 mb-8"
        >
          <IoArrowBack className="w-5 h-5" />
        </Button>

        {/* News Image */}
        <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden mb-8">
          <img
            src={`${BASE_URL}/${news.image.url}`}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Categories */}
        {news.categories && news.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {news.categories.map((category) => (
              <span
                key={category.id}
                className="bg-primary text-white rounded-full text-sm px-4 py-1.5 font-dm"
              >
                {i18n.language === "tk" ? category.nameTk : category.nameRu}
              </span>
            ))}
          </div>
        )}

        {/* Date */}
        <div className="text-textGray font-dm text-sm mb-4">
          {formatNewsDate(news.created, i18n.language)}
        </div>

        {/* Title */}
        <h1 className="font-rale text-3xl md:text-[48px] font-bold text-textPrimary mb-6">
          {title}
        </h1>

        {/* Description */}
        <div className="font-dm text-base md:text-lg text-textSecondary leading-relaxed whitespace-pre-line">
          {description}
        </div>

        {/* Tags */}
        {news.tags && news.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-dm font-medium text-textPrimary mb-4">Теги:</h3>
            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-gray-100 text-textSecondary rounded-full text-sm px-4 py-1.5 font-dm"
                >
                  {i18n.language === "tk" ? tag.nameTk : tag.nameRu}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;
