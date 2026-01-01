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
import { AddDriveTypeModal } from "./ui/AddDriveTypeModal";

import { useGetCarSpecsDriveTypes } from "@/api/carSpecs/useGetCarSpecsDriveTypes";
import { useAddCarSpecsDriveType } from "@/api/carSpecs/useAddCarSpecsDriveType";
import { useRemoveCarSpecsDriveType } from "@/api/carSpecs/useRemoveCarSpecsDriveType";
import type { NewCarDriveType, OneCarDriveType } from "@/interfaces/carSpecs.interface";

const DriveTypes = () => {
  const { toast } = useToast();
  const addDriveType = useAddCarSpecsDriveType();
  const removeDriveType = useRemoveCarSpecsDriveType();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDriveType, setNewDriveType] = useState<NewCarDriveType>({
    id: "",
    nameTk: "",
    nameRu: "",
  });

  const { data: driveTypes } = useGetCarSpecsDriveTypes(currentPage, pageSize);

  const handleEdit = (driveTypeObj: OneCarDriveType) => {
    setNewDriveType({
      id: driveTypeObj.id,
      nameTk: driveTypeObj.nameTk,
      nameRu: driveTypeObj.nameRu,
    });
    setIsModalOpen(true);
  };

  const handleSubmitDriveType = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addDriveType.mutateAsync(newDriveType);

      if (res.data) {
        toast({
          title: newDriveType.id ? "Тип привода обновлен" : "Тип привода создан",
          description: newDriveType.id
            ? "Тип привода успешно обновлен"
            : "Новый тип привода успешно добавлен",
          duration: 1000,
        });
        setNewDriveType({
          id: "",
          nameTk: "",
          nameRu: "",
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: newDriveType.id
          ? "Не удалось обновить тип привода"
          : "Не удалось создать тип привода",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleDelete = async (driveTypeId: string) => {
    try {
      await removeDriveType.mutateAsync(driveTypeId);
      toast({
        title: "Тип привода удален",
        description: "Тип привода успешно удален",
        variant: "success",
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить тип привода",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary flex items-start justify-between">
        <div>
          <div className="text-[32px] font-bold">Тип привода</div>
          <p className="text-textSecondary text-base">
            Управление типами привода автомобилей
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 text-white font-medium rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          style={{ backgroundColor: "#88ba00" }}
        >
          Добавить тип привода
        </button>
      </div>

      <AddDriveTypeModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={newDriveType}
        setFormData={setNewDriveType}
        onSubmit={handleSubmitDriveType}
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
            {driveTypes?.data.rows?.map((driveType) => (
              <TableRow
                key={driveType.id}
                className="transition-all duration-200 hover:bg-primary/10"
              >
                <TableCell className="font-medium whitespace-nowrap">
                  {driveType.nameTk}
                </TableCell>
                <TableCell className="font-medium whitespace-nowrap">
                  {driveType.nameRu}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(driveType);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 bg-transparent rounded-lg transition-colors"
                      title="Редактировать"
                    >
                      <FiEdit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(driveType.id);
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

        {driveTypes && driveTypes.data.count > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(driveTypes.data.count / pageSize)}
            totalCount={driveTypes.data.count}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default DriveTypes;