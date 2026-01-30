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
import { AddConditionModal } from "./ui/AddConditionModal";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

import { useGetCarSpecsConditions } from "@/api/carSpecs/useGetCarSpecsConditions";
import { useAddCarSpecsCondition } from "@/api/carSpecs/useAddCarSpecsCondition";
import { useRemoveCarSpecsCondition } from "@/api/carSpecs/useRemoveCarSpecsCondition";
import type {
  NewCarCondition,
  OneCarCondition,
} from "@/interfaces/carSpecs.interface";

const CarConditions = () => {
  const { toast } = useToast();
  const addCondition = useAddCarSpecsCondition();
  const removeCondition = useRemoveCarSpecsCondition();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [conditionToDelete, setConditionToDelete] = useState<OneCarCondition | null>(null);
  const [newCondition, setNewCondition] = useState<NewCarCondition>({
    id: "",
    nameTk: "",
    nameRu: "",
    descriptionTk: "",
    descriptionRu: "",
  });

  const { data: conditions } = useGetCarSpecsConditions(currentPage, pageSize);

  const handleEdit = (conditionObj: OneCarCondition) => {
    setNewCondition({
      id: conditionObj.id,
      nameTk: conditionObj.nameTk,
      nameRu: conditionObj.nameRu,
      descriptionTk: conditionObj.descriptionTk,
      descriptionRu: conditionObj.descriptionRu,
    });
    setIsModalOpen(true);
  };

  const handleSubmitCondition = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addCondition.mutateAsync(newCondition);

      if (res.data) {
        toast({
          title: newCondition.id ? "Состояние обновлено" : "Состояние создано",
          description: newCondition.id
            ? "Состояние успешно обновлено"
            : "Новое состояние успешно добавлено",
          duration: 1000,
        });
        setNewCondition({
          id: "",
          nameTk: "",
          nameRu: "",
          descriptionTk: "",
          descriptionRu: "",
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: newCondition.id
          ? "Не удалось обновить состояние"
          : "Не удалось создать состояние",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleConfirmedDelete = async () => {
    if (!conditionToDelete) return;

    try {
      await removeCondition.mutateAsync(conditionToDelete.id);
      toast({
        title: "Состояние удалено",
        description: "Состояние успешно удалено",
        variant: "success",
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить состояние",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setDeleteDialogOpen(false);
      setConditionToDelete(null);
    }
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary flex items-start justify-between">
        <div>
          <div className="text-[32px] font-bold">Состояние автомобиля</div>
          <p className="text-textSecondary text-base">
            Управление состояниями автомобилей
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 text-white font-medium rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          style={{ backgroundColor: "#88ba00" }}
        >
          Добавить состояние
        </button>
      </div>

      <AddConditionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={newCondition}
        setFormData={setNewCondition}
        onSubmit={handleSubmitCondition}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmedDelete}
        itemName={conditionToDelete ? `${conditionToDelete.nameRu} / ${conditionToDelete.nameTk}` : ''}
        itemType="состояние"
        isLoading={removeCondition.isPending}
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
                <TableHead className="font-semibold min-w-[200px]">
                  Описание (тм)
                </TableHead>
                <TableHead className="font-semibold min-w-[200px]">
                  Описание (ру)
                </TableHead>
                <TableHead className="font-semibold text-right min-w-[120px]">
                  Действия
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conditions?.data.rows?.map((condition) => (
                <TableRow
                  key={condition.id}
                  className="transition-all duration-200 hover:bg-primary/10"
                >
                  <TableCell className="font-medium whitespace-nowrap">
                    {condition.nameTk}
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {condition.nameRu}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                    <div className="line-clamp-2">
                      {condition.descriptionTk}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                    <div className="line-clamp-2">
                      {condition.descriptionRu}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(condition);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 bg-transparent rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <FiEdit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setConditionToDelete(condition);
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

        {conditions && conditions.data.count > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(conditions.data.count / pageSize)}
            totalCount={conditions.data.count}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default CarConditions;
