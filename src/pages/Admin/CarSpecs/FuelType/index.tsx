import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { AddFuelTypeModal } from "./ui/AddFuelTypeModal";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

import { useGetCarSpecsFuelTypes } from "@/api/carSpecs/useGetCarSpecsFuelTypes";
import { useAddCarSpecsFuelType } from "@/api/carSpecs/useAddCarSpecsFuelType";
import { useRemoveCarSpecsFuelType } from "@/api/carSpecs/useRemoveCarSpecsFuelType";
import type { NewCarFuelType, OneCarFuelType } from "@/interfaces/carSpecs.interface";

const FuelTypes = () => {
  const { toast } = useToast();
  const addFuelType = useAddCarSpecsFuelType();
  const removeFuelType = useRemoveCarSpecsFuelType();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fuelTypeToDelete, setFuelTypeToDelete] = useState<OneCarFuelType | null>(null);
  const [newFuelType, setNewFuelType] = useState<NewCarFuelType>({
    id: "",
    nameTk: "",
    nameRu: "",
  });

  const { data: fuelTypes } = useGetCarSpecsFuelTypes(currentPage, pageSize);

  const handleEdit = (fuelTypeObj: OneCarFuelType) => {
    setNewFuelType({
      id: fuelTypeObj.id,
      nameTk: fuelTypeObj.nameTk,
      nameRu: fuelTypeObj.nameRu,
    });
    setIsModalOpen(true);
  };

  const handleSubmitFuelType = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addFuelType.mutateAsync(newFuelType);

      if (res.data) {
        toast({
          title: newFuelType.id ? "Тип топлива обновлен" : "Тип топлива создан",
          description: newFuelType.id
            ? "Тип топлива успешно обновлен"
            : "Новый тип топлива успешно добавлен",
          duration: 1000,
        });
        setNewFuelType({
          id: "",
          nameTk: "",
          nameRu: "",
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: newFuelType.id
          ? "Не удалось обновить тип топлива"
          : "Не удалось создать тип топлива",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleConfirmedDelete = async () => {
    if (!fuelTypeToDelete) return;

    try {
      await removeFuelType.mutateAsync(fuelTypeToDelete.id);
      toast({
        title: "Тип топлива удален",
        description: "Тип топлива успешно удален",
        variant: "success",
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить тип топлива",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setDeleteDialogOpen(false);
      setFuelTypeToDelete(null);
    }
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary flex items-start justify-between">
        <div>
          <div className="text-[32px] font-bold">Тип топлива</div>
          <p className="text-textSecondary text-base">
            Управление типами топлива автомобилей
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 text-white font-medium rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          style={{ backgroundColor: "#88ba00" }}
        >
          Добавить тип топлива
        </button>
      </div>

      <AddFuelTypeModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={newFuelType}
        setFormData={setNewFuelType}
        onSubmit={handleSubmitFuelType}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmedDelete}
        itemName={fuelTypeToDelete ? `${fuelTypeToDelete.nameRu} / ${fuelTypeToDelete.nameTk}` : ''}
        itemType="тип топлива"
        isLoading={removeFuelType.isPending}
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
              {fuelTypes?.data.rows?.map((fuelType) => (
                <TableRow
                  key={fuelType.id}
                  className="transition-all duration-200 hover:bg-primary/10"
                >
                  <TableCell className="font-medium whitespace-nowrap">
                    {fuelType.nameTk}
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {fuelType.nameRu}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(fuelType);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 bg-transparent rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <FiEdit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFuelTypeToDelete(fuelType);
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

        {fuelTypes && fuelTypes.data.count > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(fuelTypes.data.count / pageSize)}
            totalCount={fuelTypes.data.count}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default FuelTypes;