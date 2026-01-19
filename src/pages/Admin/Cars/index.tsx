import { FiEye } from "react-icons/fi";
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
import { useState, useEffect } from "react";
import { useGetAdminCars } from "@/api/posts/useGetAdminCars";
import { useUpdateCarStatus } from "@/api/posts/useUpdateCarStatus";
import { useToast } from "@/hooks/use-toast";
import dayjs from "dayjs";
import { BASE_URL } from "@/api";

const AdminCars = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "checking" | "confirmed" | "rejected" | "all"
  >("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const ITEMS_PER_PAGE = 10;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: adminCars, isLoading } = useGetAdminCars({
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
    search: debouncedSearch || undefined,
    status: statusFilter === "all" ? undefined : statusFilter,
    language: "ru",
  });

  const updateCarStatus = useUpdateCarStatus();

  const posts = adminCars?.data?.rows || [];
  const totalItems = adminCars?.data?.count || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handleStatusChange = async (carId: string, newStatus: string) => {
    try {
      await updateCarStatus.mutateAsync({
        carId,
        status: newStatus as "checking" | "confirmed" | "rejected",
      });
      toast({
        title: "Статус обновлен",
        description: "Статус автомобиля успешно изменен",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус. Попробуйте снова.",
        variant: "destructive",
      });
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "checking":
        return "На проверке";
      case "confirmed":
        return "Подтверждено";
      case "rejected":
        return "Отклонено";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "checking":
        return "text-yellow-600";
      case "confirmed":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      default:
        return "text-textSecondary";
    }
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-10">
        <div className="text-[32px] font-bold">Управление автомобилями</div>
        <p className="text-textSecondary text-base">
          Просмотр и модерация объявлений
        </p>
      </div>

      <div className="w-full border border-headerBorder rounded-2xl p-4">
        {/* Filters */}
        <div className="my-6 flex justify-between items-center">
          <div className="text-textPrimary flex items-center flex-1 max-w-md">
            <CiSearch />
            <Input
              className="border-none shadow-none w-full text-textPrimary placeholder:text-textPrimary"
              placeholder="Поиск по марке, модели..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <span className="text-textGray text-[15px] font-dm">Статус</span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-none shadow-none p-0 h-auto gap-2 w-auto focus:ring-0">
                  <SelectValue className="text-textPrimary text-[15px] font-dm" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="checking">На проверке</SelectItem>
                  <SelectItem value="confirmed">Подтверждено</SelectItem>
                  <SelectItem value="rejected">Отклонено</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="bg-mainBg rounded-2xl px-9 py-[21px] mb-4">
          <div className="grid grid-cols-[2fr_1fr_0.7fr_0.7fr_1fr_1fr_1fr] gap-4 items-center">
            <p className="font-dm font-medium text-base text-primary leading-7">
              Объявление
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
              Статус
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
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl px-9 py-5 border-b border-grayBorder hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-[2fr_1fr_0.7fr_0.7fr_1fr_1fr_1fr] gap-4 items-center">
                    {/* Car Info with Image */}
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          post.images?.images?.[0]?.url
                            ? `${BASE_URL}/${post.images.images[0].url}`
                            : "https://via.placeholder.com/135x110"
                        }
                        alt={`${post.carMark?.name} ${post.carModel?.name}`}
                        className="w-[135px] h-[110px] rounded-lg object-cover"
                      />
                      <span className="font-dm text-sm text-textSecondary line-clamp-2">
                        {post.carMark?.name} {post.carModel?.name}{" "}
                        {post.issueYear
                          ? dayjs(post.issueYear).format("YYYY")
                          : ""}
                      </span>
                    </div>

                    {/* Car Mark */}
                    <span className="font-dm text-sm text-textSecondary">
                      {post.carMark?.name || "-"}
                    </span>

                    {/* Year */}
                    <span className="font-dm text-sm text-textSecondary">
                      {post.issueYear ? dayjs(post.issueYear).format("YYYY") : "-"}
                    </span>

                    {/* Transmission */}
                    <span className="font-dm text-sm text-textSecondary">
                      {post.transmission?.name || "-"}
                    </span>

                    {/* Fuel Type */}
                    <span className="font-dm text-sm text-textSecondary">
                      {post.fuelType?.name || "-"}
                    </span>

                    {/* Status */}
                    <span
                      className={`font-dm text-sm font-medium ${getStatusColor(
                        post.status || "checking"
                      )}`}
                    >
                      {getStatusLabel(post.status || "checking")}
                    </span>

                    {/* Actions - Status Change Select */}
                    <div className="flex items-center gap-3">
                      <Select
                        defaultValue={post.status || "checking"}
                        onValueChange={(value) => handleStatusChange(post.id, value)}
                      >
                        <SelectTrigger className="w-[140px] h-9 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="checking">На проверке</SelectItem>
                          <SelectItem value="confirmed">Подтвердить</SelectItem>
                          <SelectItem value="rejected">Отклонить</SelectItem>
                        </SelectContent>
                      </Select>
                      <button
                        onClick={() =>
                          window.open(`/car-details/${post.id}`, "_blank")
                        }
                        className="p-2 hover:bg-mainBg rounded-lg transition-colors text-textGray hover:text-primary"
                        title="Просмотр"
                      >
                        <FiEye size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {posts.length === 0 && !isLoading && (
              <div className="bg-white rounded-2xl px-9 py-16 border border-grayBorder text-center">
                <p className="font-dm text-textGray text-base">
                  Нет объявлений для отображения
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

export default AdminCars;