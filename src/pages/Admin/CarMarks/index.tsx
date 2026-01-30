import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
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
import { MdViewList } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { AddCarMarkModal } from "./ui/AddCarMarkModal";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

import { useGetCarMarks } from "@/api/carMarks/useGetCarMarks";
import { useAddCarMark } from "@/api/carMarks/useAddCarMark";
import { useRemoveCarMark } from "@/api/carMarks/useRemoveCarMark";
import type { NewCarMark, OneCarMark } from "@/interfaces/carMarks.interface";

const CarMarks = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const addCarMark = useAddCarMark();
  const removeCarMark = useRemoveCarMark();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [carMarkToDelete, setCarMarkToDelete] = useState<OneCarMark | null>(null);
  const [newCarMark, setNewCarMark] = useState<NewCarMark>({
    id: "",
    nameTk: "",
    nameRu: "",
    logo: {
      url: "",
      hashblur: "",
    },
  });

  const { data: carMarks } = useGetCarMarks(currentPage, pageSize);

  const handleEdit = (carMark: OneCarMark) => {
    setNewCarMark({
      id: carMark.id,
      nameTk: carMark.nameTk,
      nameRu: carMark.nameRu,
      logo: carMark.logo,
    });
    setIsModalOpen(true);
  };

  const handleSubmitCarMark = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addCarMark.mutateAsync(newCarMark);

      if (res.data) {
        toast({
          title: newCarMark.id ? "Марка обновлена" : "Марка создана",
          description: newCarMark.id
            ? "Марка машины успешно обновлена"
            : "Новая марка машины успешно добавлена",
          duration: 1000,
        });
        setNewCarMark({
          id: "",
          nameTk: "",
          nameRu: "",
          logo: {
            url: "",
            hashblur: "",
          },
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: newCarMark.id
          ? "Не удалось обновить марку"
          : "Не удалось создать марку",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleConfirmedDelete = async () => {
    if (!carMarkToDelete) return;

    try {
      await removeCarMark.mutateAsync(carMarkToDelete.id);
      toast({
        title: "Марка удалена",
        description: "Марка машины успешно удалена",
        variant: "success",
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить марку",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setDeleteDialogOpen(false);
      setCarMarkToDelete(null);
    }
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary flex items-start justify-between">
        <div>
          <div className="text-[32px] font-bold">Марки машин</div>
          <p className="text-textSecondary text-base">
            Управление марками автомобилей
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 text-white font-medium rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          style={{ backgroundColor: "#88ba00" }}
        >
          Добавить марку
        </button>
      </div>

      <AddCarMarkModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={newCarMark}
        setFormData={setNewCarMark}
        onSubmit={handleSubmitCarMark}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmedDelete}
        itemName={carMarkToDelete ? `${carMarkToDelete.nameRu} / ${carMarkToDelete.name}` : ''}
        itemType="марку"
        isLoading={removeCarMark.isPending}
      />

      <div className="mt-10">
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold min-w-[100px]">
                  Логотип
                </TableHead>
                <TableHead className="font-semibold min-w-[150px]">
                  Название (тм)
                </TableHead>
                <TableHead className="font-semibold min-w-[150px]">
                  Название (ру)
                </TableHead>
                <TableHead className="font-semibold min-w-[200px]">
                  Модели
                </TableHead>
                <TableHead className="font-semibold text-right min-w-[120px]">
                  Действия
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carMarks?.data.rows?.map((carMark) => (
                <TableRow
                  key={carMark.id}
                  className="transition-all duration-200 hover:bg-primary/10"
                >
                  <TableCell>
                    <div className="flex items-center">
                      {carMark.logo?.url ? (
                        <img
                          src={`${BASE_URL}/${carMark.logo.url}`}
                          alt={carMark.name}
                          className="w-12 h-12 object-contain rounded-md border border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-400">No logo</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {carMark.name}
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {carMark.nameRu}
                  </TableCell>
                  <TableCell className="font-medium">
                    {carMark.carModels && carMark.carModels.length > 0
                      ? carMark.carModels.map((model) => model.name).join(", ")
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin/car-marks/${carMark.id}`);
                        }}
                        className="p-2 text-green-600 hover:bg-green-50 bg-transparent rounded-lg transition-colors"
                        title="Модели"
                      >
                        <MdViewList className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(carMark);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 bg-transparent rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <FiEdit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCarMarkToDelete(carMark);
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
        </div>

        {carMarks && carMarks.data.count > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(carMarks.data.count / pageSize)}
            totalCount={carMarks.data.count}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default CarMarks;
