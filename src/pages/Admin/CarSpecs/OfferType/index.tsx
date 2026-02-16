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
import { AddOfferTypeModal } from "./ui/AddOfferTypeModal";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

import { useGetSubcategories } from "@/api/carSpecs/useGetAllOfferTypesAdmin";
import { useAddOfferType } from "@/api/carSpecs/useAddOfferType";
import { useRemoveOfferType } from "@/api/carSpecs/useRemoveOfferType";
import type {
  NewOfferType,
  OneOfferType,
} from "@/interfaces/carSpecs.interface";

const OfferTypes = () => {
  const { toast } = useToast();
  const addOfferType = useAddOfferType();
  const removeOfferType = useRemoveOfferType();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [offerTypeToDelete, setOfferTypeToDelete] =
    useState<OneOfferType | null>(null);
  const [newOfferType, setNewOfferType] = useState<NewOfferType>({
    id: "",
    nameTk: "",
    nameRu: "",
  });

  const { data: offerTypes } = useGetSubcategories(currentPage, pageSize);

  const handleEdit = (offerType: OneOfferType) => {
    setNewOfferType({
      id: offerType.id,
      nameTk: offerType.nameTk,
      nameRu: offerType.nameRu,
    });
    setIsModalOpen(true);
  };

  const handleSubmitOfferType = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addOfferType.mutateAsync(newOfferType);

      if (res.data) {
        toast({
          title: newOfferType.id
            ? "Тип предложения обновлён"
            : "Тип предложения создан",
          description: newOfferType.id
            ? "Тип предложения успешно обновлён"
            : "Новый тип предложения успешно добавлен",
          duration: 1000,
        });
        setNewOfferType({
          id: "",
          nameTk: "",
          nameRu: "",
        });
        setIsModalOpen(false);
      }
    } catch {
      toast({
        title: "Ошибка",
        description: newOfferType.id
          ? "Не удалось обновить тип предложения"
          : "Не удалось создать тип предложения",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleConfirmedDelete = async () => {
    if (!offerTypeToDelete) return;

    try {
      await removeOfferType.mutateAsync(offerTypeToDelete.id);
      toast({
        title: "Тип предложения удалён",
        description: "Тип предложения успешно удалён",
        variant: "success",
        duration: 1000,
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить тип предложения",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setDeleteDialogOpen(false);
      setOfferTypeToDelete(null);
    }
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary flex items-start justify-between">
        <div>
          <div className="text-[32px] font-bold">Типы предложений</div>
          <p className="text-textSecondary text-base">
            Управление типами предложений
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 text-white font-medium rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          style={{ backgroundColor: "#88ba00" }}
        >
          Добавить тип предложения
        </button>
      </div>

      <AddOfferTypeModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={newOfferType}
        setFormData={setNewOfferType}
        onSubmit={handleSubmitOfferType}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmedDelete}
        itemName={
          offerTypeToDelete
            ? `${offerTypeToDelete.nameRu} / ${offerTypeToDelete.nameTk}`
            : ""
        }
        itemType="тип предложения"
        isLoading={removeOfferType.isPending}
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
                <TableHead className="font-semibold text-right min-w-[120px] sticky right-0 bg-background z-10">
                  Действия
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offerTypes?.data.rows?.map((offerType) => (
                <TableRow
                  key={offerType.id}
                  className="transition-all duration-200 hover:bg-primary/10"
                >
                  <TableCell className="font-medium whitespace-nowrap">
                    {offerType.nameTk}
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {offerType.nameRu}
                  </TableCell>
                  <TableCell className="text-right sticky right-0 bg-background z-10">
                    <div className="flex items-center justify-end gap-2 bg-white">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(offerType);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 bg-transparent rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <FiEdit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOfferTypeToDelete(offerType);
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

        {offerTypes && offerTypes.data.count > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(offerTypes.data.count / pageSize)}
            totalCount={offerTypes.data.count}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default OfferTypes;
