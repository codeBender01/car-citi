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
import { AddSaleTypeModal } from "./ui/AddSaleTypeModal";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

import { useGetCarSpecsSaleTypes } from "@/api/carSpecs/useGetCarSpecsSaleTypes";
import { useAddCarSpecsSaleType } from "@/api/carSpecs/useAddCarSpecsSaleType";
import { useRemoveCarSpecsSaleType } from "@/api/carSpecs/useRemoveCarSpecsSaleType";
import type {
  NewCarSaleType,
  OneCarSaleType,
} from "@/interfaces/carSpecs.interface";

const SaleTypes = () => {
  const { toast } = useToast();
  const addSaleType = useAddCarSpecsSaleType();
  const removeSaleType = useRemoveCarSpecsSaleType();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [saleTypeToDelete, setSaleTypeToDelete] = useState<OneCarSaleType | null>(null);
  const [newSaleType, setNewSaleType] = useState<NewCarSaleType>({
    id: "",
    nameTk: "",
    nameRu: "",
  });

  const { data: saleTypes } = useGetCarSpecsSaleTypes(
    currentPage,
    pageSize
  );

  const handleEdit = (saleTypeObj: OneCarSaleType) => {
    setNewSaleType({
      id: saleTypeObj.id,
      nameTk: saleTypeObj.nameTk,
      nameRu: saleTypeObj.nameRu,
    });
    setIsModalOpen(true);
  };

  const handleSubmitSaleType = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addSaleType.mutateAsync(newSaleType);

      if (res.data) {
        toast({
          title: newSaleType.id
            ? "Тип продажи обновлен"
            : "Тип продажи создан",
          description: newSaleType.id
            ? "Тип продажи успешно обновлен"
            : "Новый тип продажи успешно добавлен",
          duration: 1000,
        });
        setNewSaleType({
          id: "",
          nameTk: "",
          nameRu: "",
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: newSaleType.id
          ? "Не удалось обновить тип продажи"
          : "Не удалось создать тип продажи",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleConfirmedDelete = async () => {
    if (!saleTypeToDelete) return;

    try {
      await removeSaleType.mutateAsync(saleTypeToDelete.id);
      toast({
        title: "Тип продажи удален",
        description: "Тип продажи успешно удален",
        variant: "success",
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить тип продажи",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setDeleteDialogOpen(false);
      setSaleTypeToDelete(null);
    }
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary flex items-start justify-between">
        <div>
          <div className="text-[32px] font-bold">Тип продажи</div>
          <p className="text-textSecondary text-base">
            Управление типами продажи автомобилей
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 text-white font-medium rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          style={{ backgroundColor: "#88ba00" }}
        >
          Добавить тип продажи
        </button>
      </div>

      <AddSaleTypeModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={newSaleType}
        setFormData={setNewSaleType}
        onSubmit={handleSubmitSaleType}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmedDelete}
        itemName={saleTypeToDelete ? `${saleTypeToDelete.nameRu} / ${saleTypeToDelete.nameTk}` : ''}
        itemType="тип продажи"
        isLoading={removeSaleType.isPending}
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
              {saleTypes?.data.rows?.map((saleType) => (
                <TableRow
                  key={saleType.id}
                  className="transition-all duration-200 hover:bg-primary/10"
                >
                  <TableCell className="font-medium whitespace-nowrap">
                    {saleType.nameTk}
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {saleType.nameRu}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(saleType);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 bg-transparent rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <FiEdit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSaleTypeToDelete(saleType);
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

        {saleTypes && saleTypes.data.count > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(saleTypes.data.count / pageSize)}
            totalCount={saleTypes.data.count}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default SaleTypes;