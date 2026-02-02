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
import { AddCharacteristicModal } from "./ui/AddCharacteristicModal";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

import { useGetCarSpecsCharacteristics } from "@/api/carSpecs/useGetCarSpecsCharacteristics";
import { useAddCarSpecsCharacteristic } from "@/api/carSpecs/useAddCarSpecsCharacteristic";
import { useRemoveCarSpecsCharacteristic } from "@/api/carSpecs/useRemoveCarSpecsCharacteristic";
import type {
  NewCarCharacteristic,
  OneCarCharacteristic,
} from "@/interfaces/carSpecs.interface";

const Characteristics = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const addCharacteristic = useAddCarSpecsCharacteristic();
  const removeCharacteristic = useRemoveCarSpecsCharacteristic();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [characteristicToDelete, setCharacteristicToDelete] =
    useState<OneCarCharacteristic | null>(null);
  const [newCharacteristic, setNewCharacteristic] =
    useState<NewCarCharacteristic>({
      id: "",
      nameTk: "",
      nameRu: "",
    });

  const { data: characteristics } = useGetCarSpecsCharacteristics(
    currentPage,
    pageSize,
  );

  const handleEdit = (characteristicObj: OneCarCharacteristic) => {
    setNewCharacteristic({
      id: characteristicObj.id,
      nameTk: characteristicObj.nameTk,
      nameRu: characteristicObj.nameRu,
    });
    setIsModalOpen(true);
  };

  const handleSubmitCharacteristic = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addCharacteristic.mutateAsync(newCharacteristic);

      if (res.data) {
        toast({
          title: newCharacteristic.id
            ? "Характеристика обновлена"
            : "Характеристика создана",
          description: newCharacteristic.id
            ? "Характеристика успешно обновлена"
            : "Новая характеристика успешно добавлена",
          duration: 1000,
        });
        setNewCharacteristic({
          id: "",
          nameTk: "",
          nameRu: "",
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: newCharacteristic.id
          ? "Не удалось обновить характеристику"
          : "Не удалось создать характеристику",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleConfirmedDelete = async () => {
    if (!characteristicToDelete) return;

    try {
      await removeCharacteristic.mutateAsync(characteristicToDelete.id);
      toast({
        title: "Характеристика удалена",
        description: "Характеристика успешно удалена",
        variant: "success",
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить характеристику",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setDeleteDialogOpen(false);
      setCharacteristicToDelete(null);
    }
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary flex items-start justify-between">
        <div>
          <div className="text-[32px] font-bold">Характеристики</div>
          <p className="text-textSecondary text-base">
            Управление характеристиками автомобилей
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 text-white font-medium rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          style={{ backgroundColor: "#88ba00" }}
        >
          Добавить характеристику
        </button>
      </div>

      <AddCharacteristicModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={newCharacteristic}
        setFormData={setNewCharacteristic}
        onSubmit={handleSubmitCharacteristic}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmedDelete}
        itemName={
          characteristicToDelete
            ? `${characteristicToDelete.nameRu} / ${characteristicToDelete.nameTk}`
            : ""
        }
        itemType="характеристику"
        isLoading={removeCharacteristic.isPending}
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
              {characteristics?.data.rows?.map((characteristic) => (
                <TableRow
                  key={characteristic.id}
                  className="transition-all duration-200 hover:bg-primary/10"
                >
                  <TableCell className="font-medium whitespace-nowrap">
                    {characteristic.nameTk}
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {characteristic.nameRu}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin/car-specs/characteristics/${characteristic.id}`);
                        }}
                        className="p-2 text-green-600 hover:bg-green-50 bg-transparent rounded-lg transition-colors"
                        title="Элементы"
                      >
                        <MdViewList className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(characteristic);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 bg-transparent rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <FiEdit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCharacteristicToDelete(characteristic);
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

        {characteristics && characteristics.data.count > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(characteristics.data.count / pageSize)}
            totalCount={characteristics.data.count}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Characteristics;
