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
import { FiEdit, FiArrowLeft, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { AddCharChildModal } from "./ui/AddCharChildModal";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

import { useGetOneCarChar } from "@/api/carSpecs/useGetOneChar";
import { useAddCarCharChild } from "@/api/carSpecs/useAddCarCharChild";
import { useRemoveCarCharChild } from "@/api/carSpecs/useRemoveCarCharChild";
import type { NewCarCharChild } from "@/interfaces/carSpecs.interface";

interface CharChildItem {
  id: string;
  nameTk: string;
  nameRu: string;
  name: string;
  characteristicId: string;
}

const CharacteristicChildren = () => {
  const { characteristicId } = useParams<{ characteristicId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const addCarCharChild = useAddCarCharChild();
  const removeCarCharChild = useRemoveCarCharChild();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CharChildItem | null>(null);
  const [newCharChild, setNewCharChild] = useState<NewCarCharChild>({
    id: "",
    nameTk: "",
    nameRu: "",
    carCharacteristicId: characteristicId || "",
  });

  const { data: characteristic } = useGetOneCarChar(
    characteristicId || "",
    1,
    10,
  );

  const handleEdit = (item: CharChildItem) => {
    setNewCharChild({
      id: item.id,
      nameTk: item.nameTk,
      nameRu: item.nameRu,
      carCharacteristicId: characteristicId || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmitCharChild = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addCarCharChild.mutateAsync(newCharChild);

      if (res.data) {
        toast({
          title: newCharChild.id ? "Элемент обновлен" : "Элемент создан",
          description: newCharChild.id
            ? "Элемент успешно обновлен"
            : "Новый элемент успешно добавлен",
          duration: 1000,
        });
        setNewCharChild({
          id: "",
          nameTk: "",
          nameRu: "",
          carCharacteristicId: characteristicId || "",
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: newCharChild.id
          ? "Не удалось обновить элемент"
          : "Не удалось создать элемент",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleConfirmedDelete = async () => {
    if (!itemToDelete) return;

    try {
      await removeCarCharChild.mutateAsync(itemToDelete.id);
      toast({
        title: "Элемент удален",
        description: "Элемент успешно удален",
        variant: "success",
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить элемент",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <button
        onClick={() => navigate("/admin/car-specs/characteristics")}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <FiArrowLeft className="w-4 h-4" />
        <span>Назад к характеристикам</span>
      </button>

      <div className="font-dm text-textSecondary flex items-start justify-between">
        <div>
          <div className="text-[32px] font-bold">
            Элементы - {characteristic?.data?.name || ""}
          </div>
          <p className="text-textSecondary text-base">
            Управление элементами характеристики {characteristic?.data?.nameRu || ""}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 text-white font-medium rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          style={{ backgroundColor: "#88ba00" }}
        >
          Добавить элемент
        </button>
      </div>

      <AddCharChildModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={newCharChild}
        setFormData={setNewCharChild}
        onSubmit={handleSubmitCharChild}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmedDelete}
        itemName={itemToDelete ? `${itemToDelete.nameRu} / ${itemToDelete.nameTk}` : ''}
        itemType="элемент"
        isLoading={removeCarCharChild.isPending}
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
              {characteristic?.data?.items?.map((item) => (
                <TableRow
                  key={item.id}
                  className="transition-all duration-200 hover:bg-primary/10"
                >
                  <TableCell className="font-medium whitespace-nowrap">
                    {item.nameTk}
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {item.nameRu}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(item);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 bg-transparent rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <FiEdit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setItemToDelete(item);
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

export default CharacteristicChildren;
