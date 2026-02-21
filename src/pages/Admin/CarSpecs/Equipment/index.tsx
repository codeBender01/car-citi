import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { AddEquipmentModal } from "./ui/AddEquipmentModal";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

import { useGetCarSpecsEquipment } from "@/api/carSpecs/useGetCarSpecsEquipment";
import { useAddCarSpecsEquipment } from "@/api/carSpecs/useAddCarSpecsEquipment";
import { useRemoveCarSpecsEquipment } from "@/api/carSpecs/useRemoveCarSpecsEquipment";
import type {
  NewCarEquipment,
  OneCarEquipment,
} from "@/interfaces/carSpecs.interface";

const Equipment = () => {
  const { toast } = useToast();
  const addEquipment = useAddCarSpecsEquipment();
  const removeEquipment = useRemoveCarSpecsEquipment();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] =
    useState<OneCarEquipment | null>(null);
  const [newEquipment, setNewEquipment] = useState<NewCarEquipment>({
    id: "",
    nameTk: "",
    nameRu: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: equipment } = useGetCarSpecsEquipment(
    currentPage,
    pageSize,
    debouncedSearch,
  );

  const handleEdit = (item: OneCarEquipment) => {
    setNewEquipment({
      id: item.id,
      nameTk: item.nameTk,
      nameRu: item.nameRu,
    });
    setIsModalOpen(true);
  };

  const handleSubmitEquipment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addEquipment.mutateAsync(newEquipment);

      if (res.data) {
        toast({
          title: newEquipment.id
            ? "Оборудование обновлено"
            : "Оборудование создано",
          description: newEquipment.id
            ? "Оборудование успешно обновлено"
            : "Новое оборудование успешно добавлено",
          duration: 1000,
        });
        setNewEquipment({
          id: "",
          nameTk: "",
          nameRu: "",
        });
        setIsModalOpen(false);
      }
    } catch {
      toast({
        title: "Ошибка",
        description: newEquipment.id
          ? "Не удалось обновить оборудование"
          : "Не удалось создать оборудование",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleConfirmedDelete = async () => {
    if (!equipmentToDelete) return;

    try {
      await removeEquipment.mutateAsync(equipmentToDelete.id);
      toast({
        title: "Оборудование удалено",
        description: "Оборудование успешно удалено",
        variant: "success",
        duration: 1000,
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить оборудование",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setDeleteDialogOpen(false);
      setEquipmentToDelete(null);
    }
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary flex items-start justify-between">
        <div>
          <div className="text-[32px] font-bold">Комплектация</div>
          <p className="text-textSecondary text-base">
            Управление комплектациями автомобилей
          </p>
        </div>

        <button
          onClick={() => {
            setNewEquipment({ id: "", nameTk: "", nameRu: "" });
            setIsModalOpen(true);
          }}
          className="px-6 py-2.5 text-white font-medium rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          style={{ backgroundColor: "#88ba00" }}
        >
          Добавить комплектацию
        </button>
      </div>

      <div className="mt-6">
        <Input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <AddEquipmentModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={newEquipment}
        setFormData={setNewEquipment}
        onSubmit={handleSubmitEquipment}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmedDelete}
        itemName={
          equipmentToDelete
            ? `${equipmentToDelete.nameRu} / ${equipmentToDelete.nameTk}`
            : ""
        }
        itemType="оборудование"
        isLoading={removeEquipment.isPending}
      />

      <div className="mt-6">
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
              {equipment?.data.rows?.map((item) => (
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
                          setEquipmentToDelete(item);
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

        {equipment && equipment.data.count > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(equipment.data.count / pageSize)}
            totalCount={equipment.data.count}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Equipment;
