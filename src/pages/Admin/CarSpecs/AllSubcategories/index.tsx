import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
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
import { AddSubcategoryModal } from "./ui/AddSubcategoryModal";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

import { useGetSubcategories } from "@/api/carSpecs/useGetAllSubcategories";
import { useAddCarSpecsSubcategory } from "@/api/carSpecs/useAddCarSpecsSubcategory";
import { useRemoveCarSpecsSubcategory } from "@/api/carSpecs/useRemoveCarSpecsSubcategory";
import type {
  NewCarSpecsSubcategory,
  OneCarSpecsSubcategory,
} from "@/interfaces/carSpecs.interface";

const AllSubcategories = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const addSubcategory = useAddCarSpecsSubcategory();
  const removeSubcategory = useRemoveCarSpecsSubcategory();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subcategoryToDelete, setSubcategoryToDelete] =
    useState<OneCarSpecsSubcategory | null>(null);
  const [newSubcategory, setNewSubcategory] = useState<NewCarSpecsSubcategory>({
    id: "",
    nameTk: "",
    nameRu: "",
    categoryId: "",
  });

  const { data: subcategories } = useGetSubcategories(currentPage, pageSize);

  const handleEdit = (subcategory: OneCarSpecsSubcategory) => {
    setNewSubcategory({
      id: subcategory.id,
      nameTk: subcategory.nameTk,
      nameRu: subcategory.nameRu,
      categoryId: subcategory.categoryId,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addSubcategory.mutateAsync(newSubcategory);

      if (res.data) {
        toast({
          title: newSubcategory.id
            ? "Тип кузова обновлен"
            : "Тип кузова создан",
          description: newSubcategory.id
            ? "Тип кузова успешно обновлен"
            : "Новый тип кузова успешно добавлен",
          duration: 1000,
        });
        setNewSubcategory({
          id: "",
          nameTk: "",
          nameRu: "",
          categoryId: "",
        });
        setIsModalOpen(false);
        queryClient.invalidateQueries({
          queryKey: ["getAllSubcategories"],
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: newSubcategory.id
          ? "Не удалось обновить тип кузова"
          : "Не удалось создать тип кузова",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleConfirmedDelete = async () => {
    if (!subcategoryToDelete) return;

    try {
      await removeSubcategory.mutateAsync(subcategoryToDelete.id);
      toast({
        title: "Тип кузова удален",
        description: "Тип кузова успешно удален",
        variant: "success",
        duration: 1000,
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllSubcategories"],
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить тип кузова",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setDeleteDialogOpen(false);
      setSubcategoryToDelete(null);
    }
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary flex items-start justify-between">
        <div>
          <div className="text-[32px] font-bold">Тип кузова</div>
          <p className="text-textSecondary text-base">
            Управление типами кузова автомобилей
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 text-white font-medium rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          style={{ backgroundColor: "#88ba00" }}
        >
          Добавить тип кузова
        </button>
      </div>

      <AddSubcategoryModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={newSubcategory}
        setFormData={setNewSubcategory}
        onSubmit={handleSubmit}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmedDelete}
        itemName={
          subcategoryToDelete
            ? `${subcategoryToDelete.nameRu} / ${subcategoryToDelete.nameTk}`
            : ""
        }
        itemType="тип кузова"
        isLoading={removeSubcategory.isPending}
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
              {subcategories?.data.rows?.map((subcategory) => (
                <TableRow
                  key={subcategory.id}
                  className="transition-all duration-200 hover:bg-primary/10"
                >
                  <TableCell className="font-medium whitespace-nowrap">
                    {subcategory.nameTk}
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {subcategory.nameRu}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(subcategory);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 bg-transparent rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <FiEdit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSubcategoryToDelete(subcategory);
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

        {subcategories && subcategories.data.count > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(subcategories.data.count / pageSize)}
            totalCount={subcategories.data.count}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default AllSubcategories;
