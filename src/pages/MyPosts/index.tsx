import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Pagination from "@/components/Pagination";

import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

import { useGetOwnPosts } from "@/api/posts/useGetOwnPosts";
import { useDeletePost } from "@/api/posts/useDeletePost";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import dayjs from "dayjs";

const MyPosts = () => {
  const { i18n } = useTranslation();
  const { toast } = useToast();
  const [selectedCar, setSelectedCar] = useState("Audi A3");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: ownPosts, isLoading } = useGetOwnPosts(i18n.language);
  const deletePost = useDeletePost();

  const ITEMS_PER_PAGE = 10;
  const posts = ownPosts?.data?.rows || [];
  const totalItems = ownPosts?.data?.count || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  const handleDelete = async (id: string) => {
    try {
      await deletePost.mutateAsync(id);
      toast({
        title: "Успешно удалено",
        description: "Объявление было успешно удалено",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить объявление. Попробуйте снова.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 md:p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-6 md:mb-10">
        <div className="text-2xl md:text-[32px] font-bold">Мои объявления</div>
      </div>

      <div className="w-full border border-headerBorder rounded-2xl p-3 md:p-4">
        <div className="my-4 md:my-6 flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
          <div className="text-textPrimary flex items-center">
            <CiSearch />
            <Input
              className="border-none shadow-none w-fit text-textPrimary placeholder:text-textPrimary"
              placeholder="Поиск"
            />
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-textGray text-[15px] font-dm hidden sm:inline">
              Сортировать по
            </span>
            <Select value={selectedCar} onValueChange={setSelectedCar}>
              <SelectTrigger className="border-none shadow-none p-0 h-auto gap-2 w-auto focus:ring-0">
                <SelectValue className="text-textPrimary text-[15px] font-dm" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Audi A3">Новые</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="bg-mainBg rounded-2xl px-4 md:px-9 py-[21px] mb-4 hidden lg:block">
          <div className="grid grid-cols-[2fr_1fr_0.7fr_0.7fr_1fr_1fr] gap-4 items-center">
            <p className="font-dm font-medium text-base text-primary leading-7">
              Объявления
            </p>
            <p className="font-dm font-medium text-base text-primary leading-7">
              Марка
            </p>
            <p className="font-dm font-medium text-base text-primary leading-7">
              Год
            </p>
            <p className="font-dm font-medium text-base text-primary leading-7">
              КП
            </p>
            <p className="font-dm font-medium text-base text-primary leading-7">
              Тип топлива
            </p>
            <p className="font-dm font-medium text-base text-primary leading-7">
              Действие
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-2xl px-9 py-16 border border-grayBorder text-center">
            <p className="font-dm text-textGray text-base">Загрузка...</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {paginatedPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl px-3 md:px-9 py-5 border-b border-grayBorder hover:shadow-md transition-shadow"
                >
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid grid-cols-[2fr_1fr_0.7fr_0.7fr_1fr_1fr] gap-4 items-center">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          post.images?.images?.[0]?.url
                            ? `${import.meta.env.VITE_BASE_URL}/${
                                post.images.images[0].url
                              }`
                            : "https://via.placeholder.com/135x110"
                        }
                        alt={`${post.carMark?.name} ${post.carModel?.name}`}
                        className="w-[135px] h-[110px] rounded-lg object-cover"
                      />
                      <span className="font-dm text-sm text-textSecondary line-clamp-2">
                        {post.carMark?.name} {post.carModel?.name}{" "}
                        {post.issueYear
                          ? dayjs(post.issueYear).format("DD.MM.YYYY")
                          : ""}
                      </span>
                    </div>

                    <span className="font-dm text-sm text-textSecondary">
                      {post.carMark?.name || "-"}
                    </span>

                    <span className="font-dm text-sm text-textSecondary">
                      {post.issueYear
                        ? dayjs(post.issueYear).format("DD.MM.YYYY")
                        : "-"}
                    </span>

                    <span className="font-dm text-sm text-textSecondary">
                      {post.transmission?.name || "-"}
                    </span>

                    <span className="font-dm text-sm text-textSecondary">
                      {post.fuelType?.name || "-"}
                    </span>

                    <div className="flex items-center gap-3">
                      <button className="p-2 hover:bg-mainBg rounded-lg transition-colors text-textGray hover:text-primary">
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 hover:bg-mainBg rounded-lg transition-colors text-textGray hover:text-danger"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="lg:hidden flex flex-col gap-3">
                    <div className="flex gap-3">
                      <img
                        src={
                          post.images?.images?.[0]?.url
                            ? `${import.meta.env.VITE_BASE_URL}/${
                                post.images.images[0].url
                              }`
                            : "https://via.placeholder.com/100x80"
                        }
                        alt={`${post.carMark?.name} ${post.carModel?.name}`}
                        className="w-[100px] h-[80px] rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col gap-1">
                        <span className="font-dm text-sm font-medium text-textSecondary">
                          {post.carMark?.name} {post.carModel?.name}
                        </span>
                        <span className="font-dm text-xs text-textGray">
                          {post.issueYear
                            ? dayjs(post.issueYear).format("YYYY")
                            : "-"}
                        </span>
                        <div className="flex gap-2 text-xs text-textGray">
                          <span>{post.transmission?.name}</span>
                          <span>•</span>
                          <span>{post.fuelType?.name}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      <button className="p-2 hover:bg-mainBg rounded-lg transition-colors text-textGray hover:text-primary">
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 hover:bg-mainBg rounded-lg transition-colors text-textGray hover:text-danger"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {posts.length === 0 && !isLoading && (
              <div className="bg-white rounded-2xl px-9 py-16 border border-grayBorder text-center">
                <p className="font-dm text-textGray text-base">
                  У вас пока нет объявлений
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

export default MyPosts;
