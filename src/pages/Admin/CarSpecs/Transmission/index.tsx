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
import { AddTransmissionModal } from "./ui/AddTransmissionModal";

import { useGetCarSpecsTransmissions } from "@/api/carSpecs/useGetCarSpecsTransmissions";
import { useAddCarSpecsTransmission } from "@/api/carSpecs/useAddCarSpecsTransmission";
import { useRemoveCarSpecsTransmission } from "@/api/carSpecs/useRemoveCarSpecsTransmission";
import type {
  NewCarTransmission,
  OneCarTransmission,
} from "@/interfaces/carSpecs.interface";

const Transmissions = () => {
  const { toast } = useToast();
  const addTransmission = useAddCarSpecsTransmission();
  const removeTransmission = useRemoveCarSpecsTransmission();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTransmission, setNewTransmission] = useState<NewCarTransmission>({
    id: "",
    nameTk: "",
    nameRu: "",
  });

  const { data: transmissions } = useGetCarSpecsTransmissions(
    currentPage,
    pageSize
  );

  const handleEdit = (transmissionObj: OneCarTransmission) => {
    setNewTransmission({
      id: transmissionObj.id,
      nameTk: transmissionObj.nameTk,
      nameRu: transmissionObj.nameRu,
    });
    setIsModalOpen(true);
  };

  const handleSubmitTransmission = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addTransmission.mutateAsync(newTransmission);

      if (res.data) {
        toast({
          title: newTransmission.id
            ? "Трансмиссия обновлена"
            : "Трансмиссия создана",
          description: newTransmission.id
            ? "Трансмиссия успешно обновлена"
            : "Новая трансмиссия успешно добавлена",
          duration: 1000,
        });
        setNewTransmission({
          id: "",
          nameTk: "",
          nameRu: "",
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: newTransmission.id
          ? "Не удалось обновить трансмиссию"
          : "Не удалось создать трансмиссию",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleDelete = async (transmissionId: string) => {
    try {
      await removeTransmission.mutateAsync(transmissionId);
      toast({
        title: "Трансмиссия удалена",
        description: "Трансмиссия успешно удалена",
        variant: "success",
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить трансмиссию",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary flex items-start justify-between">
        <div>
          <div className="text-[32px] font-bold">Трансмиссия</div>
          <p className="text-textSecondary text-base">
            Управление типами трансмиссии автомобилей
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 text-white font-medium rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          style={{ backgroundColor: "#88ba00" }}
        >
          Добавить трансмиссию
        </button>
      </div>

      <AddTransmissionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={newTransmission}
        setFormData={setNewTransmission}
        onSubmit={handleSubmitTransmission}
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
              {transmissions?.data.rows?.map((transmission) => (
                <TableRow
                  key={transmission.id}
                  className="transition-all duration-200 hover:bg-primary/10"
                >
                  <TableCell className="font-medium whitespace-nowrap">
                    {transmission.nameTk}
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {transmission.nameRu}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(transmission);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 bg-transparent rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <FiEdit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(transmission.id);
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

        {transmissions && transmissions.data.count > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(transmissions.data.count / pageSize)}
            totalCount={transmissions.data.count}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Transmissions;