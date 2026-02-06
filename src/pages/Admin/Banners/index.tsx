import { useState } from "react";
import AddBannerModal from "./ui/AddBannerModal";

import { useGetBanners } from "@/api/banners/useGetAllBanners";
import { useAddBanner } from "@/api/banners/useAddBanner";
import { useRemoveBanner } from "@/api/banners/useRemoveBanner";
import { useToast } from "@/hooks/use-toast";
import type { NewBanner, OneBanner } from "@/interfaces/banners.interface";
import { BASE_URL } from "@/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

const Banners = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const { data: banners } = useGetBanners(currentPage, pageSize);
  const { toast } = useToast();
  const addBanner = useAddBanner();
  const removeBanner = useRemoveBanner();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState<OneBanner | null>(null);
  const [newBanner, setNewBanner] = useState<NewBanner>({
    id: "",
    link: "",
    image: {
      url: "",
      hashblur: "",
    },
  });

  const handleEdit = (banner: OneBanner) => {
    setNewBanner({
      id: banner.id,
      link: banner.link,
      image: banner.image,
    });
    setIsModalOpen(true);
  };

  const handleSubmitBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await addBanner.mutateAsync(newBanner);

    if (res.data) {
      toast({
        title: "Баннер создан",
        description: "Новый баннер успешно добавлен",
        duration: 1000,
      });
      setNewBanner({
        id: "",
        link: "",
        image: {
          url: "",
          hashblur: "",
        },
      });
      setIsModalOpen(false);
    } else {
      toast({
        title: "Ошибка",
        description: "Не удалось создать баннер",
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  const handleConfirmedDelete = async () => {
    if (!bannerToDelete) return;

    const res = await removeBanner.mutateAsync(bannerToDelete.id);

    if (res.data) {
      toast({
        title: "Баннер удален",
        variant: "success",
        duration: 1000,
      });
    } else {
      toast({
        title: "Ошибка",
        variant: "destructive",
        duration: 1000,
      });
    }

    setDeleteDialogOpen(false);
    setBannerToDelete(null);
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm flex items-center justify-between text-textSecondary">
        <div className="text-[32px] font-bold">Баннеры</div>
        <AddBannerModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          formData={newBanner}
          setFormData={setNewBanner}
          onSubmit={handleSubmitBanner}
          isPending={addBanner.isPending}
        />
      </div>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmedDelete}
        itemName={bannerToDelete ? bannerToDelete.link : ""}
        itemType="баннер"
        isLoading={removeBanner.isPending}
      />

      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">Изображение</TableHead>
              <TableHead className="font-semibold">Ссылка</TableHead>
              <TableHead className="font-semibold text-right">
                Действия
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners?.data?.rows?.map((banner) => (
              <TableRow
                key={banner.id}
                className="transition-all duration-200 hover:bg-primary/10"
              >
                <TableCell className="font-medium">
                  <div className="w-[150px] h-[80px] rounded-lg overflow-hidden border">
                    <img
                      src={`${BASE_URL}/${banner.image.url}`}
                      alt="Banner"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium max-w-[200px] truncate">
                  <a
                    href={banner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {banner.link}
                  </a>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(banner);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 bg-transparent rounded-lg transition-colors"
                      title="Редактировать"
                    >
                      <FiEdit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setBannerToDelete(banner);
                        setDeleteDialogOpen(true);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 bg-transparent rounded-lg transition-colors"
                      title="Удалить"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {banners?.data && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil((banners.data.count || 0) / pageSize)}
            totalCount={banners.data.count || 0}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Banners;
