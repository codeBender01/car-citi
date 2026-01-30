import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiEdit, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { AddCarModelModal } from "./ui/AddCarModelModal";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

import { useGetOneCarMark } from "@/api/carMarks/useGetOneCarMark";
import { useAddCarModel } from "@/api/carMarks/useAddCarModel";
import { useRemoveCarModel } from "@/api/carMarks/useRemoveCarModel";
import type { NewCarModel, OneCarModel } from "@/interfaces/carMarks.interface";

const CarModels = () => {
  const { carMarkId } = useParams<{ carMarkId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const addCarModel = useAddCarModel();
  const removeCarModel = useRemoveCarModel();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [modelToDelete, setModelToDelete] = useState<OneCarModel | null>(null);
  const [newCarModel, setNewCarModel] = useState<NewCarModel>({
    id: "",
    nameTk: "",
    nameRu: "",
    carMarkId: carMarkId || "",
  });

  const { data: carMark } = useGetOneCarMark(carMarkId || "", 1, 10);

  const handleEdit = (model: OneCarModel) => {
    setNewCarModel({
      id: model.id,
      nameTk: model.nameTk,
      nameRu: model.nameRu,
      carMarkId: carMarkId || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmitCarModel = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addCarModel.mutateAsync(newCarModel);

      if (res.data) {
        toast({
          title: newCarModel.id ? "Модель обновлена" : "Модель создана",
          description: newCarModel.id
            ? "Модель успешно обновлена"
            : "Новая модель успешно добавлена",
          duration: 1000,
        });
        setNewCarModel({
          id: "",
          nameTk: "",
          nameRu: "",
          carMarkId: carMarkId || "",
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: newCarModel.id
          ? "Не удалось обновить модель"
          : "Не удалось создать модель",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleConfirmedDelete = async () => {
    if (!modelToDelete) return;

    try {
      await removeCarModel.mutateAsync(modelToDelete.id);
      toast({
        title: "Модель удалена",
        description: "Модель успешно удалена",
        variant: "success",
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить модель",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setDeleteDialogOpen(false);
      setModelToDelete(null);
    }
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <button
        onClick={() => navigate("/admin/car-marks")}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <FiArrowLeft className="w-4 h-4" />
        <span>Назад к маркам</span>
      </button>

      <div className="font-dm text-textSecondary flex items-start justify-between">
        <div>
          <div className="text-[32px] font-bold">
            Модели - {carMark?.data?.name || ""}
          </div>
          <p className="text-textSecondary text-base">
            Управление моделями марки {carMark?.data?.nameRu || ""}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 text-white font-medium rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          style={{ backgroundColor: "#88ba00" }}
        >
          Добавить модель
        </button>
      </div>

      <AddCarModelModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={newCarModel}
        setFormData={setNewCarModel}
        onSubmit={handleSubmitCarModel}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmedDelete}
        itemName={modelToDelete ? `${modelToDelete.nameRu} / ${modelToDelete.nameTk}` : ''}
        itemType="модель"
        isLoading={removeCarModel.isPending}
      />

      <div className="mt-10">
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold min-w-[150px]">
                  Название (тм)
                </TableHead>
                <TableHead className="font-semibold min-w-[150px]">
                  Название (ру)
                </TableHead>
                <TableHead className="font-semibold text-right min-w-[120px]">
                  Действия
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carMark?.data?.carModels?.map((model) => (
                <TableRow
                  key={model.id}
                  className="transition-all duration-200 hover:bg-primary/10"
                >
                  <TableCell className="font-medium whitespace-nowrap">
                    {model.nameTk}
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {model.nameRu}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(model);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 bg-transparent rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <FiEdit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModelToDelete(model);
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
      </div>
    </div>
  );
};

export default CarModels;
