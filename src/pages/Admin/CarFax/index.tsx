import { useState, useMemo } from "react";
import { FiEye } from "react-icons/fi";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";
import { useGetCarFaxAll } from "@/api/carfax/useGetCarFaxAll";
import { useGetAdminCars } from "@/api/posts/useGetAdminCars";
import type { CarFaxItem } from "@/interfaces/carfax.interface";
import type { OnePost } from "@/interfaces/posts.interface";
import CarFaxReportModal from "./ui/CarFaxReportModal";

const CarFax = () => {
  const { t } = useTranslation();
  const [selectedCarFax, setSelectedCarFax] = useState<CarFaxItem | null>(null);
  const [selectedPost, setSelectedPost] = useState<OnePost | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "view">("view");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const { data: carFaxData, isLoading } = useGetCarFaxAll();
  const { data: adminCars } = useGetAdminCars({
    page: 1,
    pageSize: 500,
    language: "ru",
  });

  const postsMap = useMemo(() => {
    const map = new Map<string, OnePost>();
    adminCars?.data?.rows?.forEach((post) => {
      map.set(post.id, post);
    });
    return map;
  }, [adminCars]);

  const rows = carFaxData?.data?.rows || [];

  const getCarName = (carId: string) => {
    const post = postsMap.get(carId);
    if (!post) return carId;
    const mark = post.carMark?.name || "";
    const model = post.carModel?.name || "";
    return `${mark} ${model}`.trim() || carId;
  };

  const handleOpenView = (item: CarFaxItem) => {
    const post = postsMap.get(item.carId) || null;
    setSelectedPost(post);
    setSelectedCarFax(item);
    setModalMode("view");
    setCreateModalOpen(true);
  };

  const handleOpenCreate = () => {
    setSelectedPost(null);
    setSelectedCarFax(null);
    setModalMode("create");
    setCreateModalOpen(true);
  };

  const handleClose = () => {
    setSelectedCarFax(null);
    setSelectedPost(null);
    setCreateModalOpen(false);
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-10 flex items-start justify-between">
        <div>
          <div className="text-[32px] font-bold">{t("carfax.title")}</div>
          <p className="text-textSecondary text-base">{t("carfax.subtitle")}</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-6 py-2.5 text-white font-medium rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          style={{ backgroundColor: "#88ba00" }}
        >
          {t("carfax.add")}
        </button>
      </div>

      <div className="w-full border border-headerBorder rounded-2xl p-4">
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
                      Авто
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary">
                      VIN
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary">
                      Цена
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary">
                      Статус
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary sticky right-0 bg-mainBg z-10">
                      Действие
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((item) => (
                    <TableRow key={item.carId} className="hover:bg-mainBg/50">
                      <TableCell className="font-dm text-sm text-textSecondary">
                        {getCarName(item.carId)}
                      </TableCell>
                      <TableCell className="font-dm text-sm text-textSecondary">
                        {item.vin || "-"}
                      </TableCell>
                      <TableCell className="font-dm text-sm text-textSecondary">
                        {item.price > 0 ? `${item.price} TMT` : "Бесплатно"}
                      </TableCell>
                      <TableCell className="font-dm text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="sticky right-0 bg-white z-10">
                        <button
                          onClick={() => handleOpenView(item)}
                          className="p-2 hover:bg-mainBg rounded-lg transition-colors text-textGray hover:text-primary"
                          title="Просмотр"
                        >
                          <FiEye size={18} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {rows.length === 0 && !isLoading && (
              <div className="bg-white rounded-2xl px-9 py-16 border border-grayBorder text-center">
                <p className="font-dm text-textGray text-base">
                  Нет отчётов для отображения
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <CarFaxReportModal
        post={selectedPost}
        carFaxItem={selectedCarFax}
        posts={adminCars?.data?.rows || []}
        open={createModalOpen}
        mode={modalMode}
        onClose={handleClose}
      />
    </div>
  );
};

export default CarFax;
