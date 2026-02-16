import { FiEye } from "react-icons/fi";
import Pagination from "@/components/Pagination";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useGetAdminCars } from "@/api/posts/useGetAdminCars";
import { useUpdateCarStatus } from "@/api/posts/useUpdateCarStatus";
import { useEnableCar } from "@/api/posts/useEnableCar";
import { useVerifyCar } from "@/api/posts/useVerifyCar";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import dayjs from "dayjs";
import { BASE_URL } from "@/api";
import type { OnePost } from "@/interfaces/posts.interface";
import CarPreviewDrawer from "../Cars/ui/CarPreviewDrawer";
import CarImageGallery from "../Cars/ui/CarImageGallery";

import { Image } from "lucide-react";

const CarRequests = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCar, setSelectedCar] = useState<OnePost | null>(null);
  const [galleryImages, setGalleryImages] = useState<
    { hashblur: string; url: string }[] | null
  >(null);

  const ITEMS_PER_PAGE = 10;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: adminCars, isLoading } = useGetAdminCars({
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
    search: debouncedSearch || undefined,
    status: "checking",
    language: "ru",
  });

  const updateCarStatus = useUpdateCarStatus();
  const enableCar = useEnableCar();
  const verifyCar = useVerifyCar();

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

  const handleEnableToggle = async (carId: string) => {
    try {
      await enableCar.mutateAsync(carId);
      toast({
        title: "Успешно",
        description: "Статус объявления обновлен",
        variant: "success",
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус. Попробуйте снова.",
        variant: "destructive",
      });
    }
  };

  const handleVerifyToggle = async (carId: string, currentStatus: string) => {
    try {
      await verifyCar.mutateAsync({
        carId,
        verifiedStatus:
          currentStatus === "verified" ? "notVerified" : "verified",
      });
      toast({
        title: "Успешно",
        description: "Статус проверки обновлен",
        variant: "success",
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус проверки.",
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
        <div className="text-[32px] font-bold">Заявки на проверку авто</div>
        <p className="text-textSecondary text-base">
          Заявки на проверку автомобилей
        </p>
      </div>

      <div className="w-full border border-headerBorder rounded-2xl p-4">
        {/* Search */}
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
        </div>

        {isLoading ? (
          <div className="bg-white rounded-2xl px-9 py-16 border border-grayBorder text-center">
            <p className="font-dm text-textGray text-base">Загрузка...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-mainBg hover:bg-mainBg border-none">
                    <TableHead className="font-dm font-medium text-base text-primary">
                      Объявление
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary">
                      Марка
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary">
                      Год
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary">
                      КП
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary">
                      Тип топлива
                    </TableHead>

                    <TableHead className="font-dm font-medium text-base text-primary">
                      Вкл/Выкл
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary">
                      Проверенные
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary sticky right-0 bg-mainBg z-10">
                      Действие
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id} className="hover:bg-mainBg/50">
                      <TableCell>
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
                        </div>
                      </TableCell>
                      <TableCell className="font-dm text-sm text-textSecondary">
                        {post.carMark?.name} {post.carModel?.name}
                      </TableCell>
                      <TableCell className="font-dm text-sm text-textSecondary">
                        {post.issueYear
                          ? dayjs(post.issueYear).format("YYYY")
                          : "-"}
                      </TableCell>
                      <TableCell className="font-dm text-sm text-textSecondary">
                        {post.transmission?.name || "-"}
                      </TableCell>

                      <TableCell>
                        <span
                          className={`font-dm text-sm font-medium ${getStatusColor(
                            post.status || "checking",
                          )}`}
                        >
                          {getStatusLabel(post.status || "checking")}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={post.isActive ?? false}
                          onCheckedChange={() => handleEnableToggle(post.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={post.verifiedStatus === "verified"}
                          onCheckedChange={() =>
                            handleVerifyToggle(post.id, post.verifiedStatus)
                          }
                        />
                      </TableCell>
                      <TableCell className="sticky right-0 bg-white z-10">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              setGalleryImages(post.images?.images || [])
                            }
                            className="p-2 hover:bg-mainBg rounded-lg transition-colors text-textGray hover:text-primary"
                            title="Фото"
                          >
                            <Image size={18} />
                          </button>
                          <button
                            onClick={() => setSelectedCar(post)}
                            className="p-2 hover:bg-mainBg rounded-lg transition-colors text-textGray hover:text-primary"
                            title="Просмотр"
                          >
                            <FiEye size={18} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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

      <CarPreviewDrawer
        car={selectedCar}
        onClose={() => setSelectedCar(null)}
        onStatusChange={handleStatusChange}
      />

      <CarImageGallery
        images={galleryImages || []}
        open={!!galleryImages}
        onClose={() => setGalleryImages(null)}
      />
    </div>
  );
};

export default CarRequests;
