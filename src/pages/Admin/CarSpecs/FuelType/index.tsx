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

interface FuelType {
  id: string;
  nameTk: string;
  nameRu: string;
}

interface NewFuelType {
  id: string;
  nameTk: string;
  nameRu: string;
}

const FuelTypes = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFuelType, setNewFuelType] = useState<NewFuelType>({
    id: "",
    nameTk: "",
    nameRu: "",
  });

  // Temporary data - replace with actual API call
  const fuelTypes: FuelType[] = [];
  const totalCount = 0;

  const handleEdit = (fuelTypeObj: FuelType) => {
    setNewFuelType({
      id: fuelTypeObj.id,
      nameTk: fuelTypeObj.nameTk,
      nameRu: fuelTypeObj.nameRu,
    });
    setIsModalOpen(true);
  };

  const handleSubmitFuelType = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call
    toast({
      title: "Тип топлива создан",
      description: "Новый тип топлива успешно добавлен",
      duration: 1000,
    });
    setNewFuelType({
      id: "",
      nameTk: "",
      nameRu: "",
    });
    setIsModalOpen(false);
  };

  const handleDelete = async (fuelTypeId: string) => {
    // TODO: Implement API call
    toast({
      title: "Тип топлива удален",
      variant: "success",
      duration: 1000,
    });
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

      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">Название (тм)</TableHead>
              <TableHead className="font-semibold">Название (ру)</TableHead>
              <TableHead className="font-semibold text-right">
                Действия
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fuelTypes?.map((fuelType) => (
              <TableRow
                key={fuelType.id}
                className="transition-all duration-200 hover:bg-primary/10"
              >
                <TableCell className="font-medium">{fuelType.nameTk}</TableCell>
                <TableCell className="font-medium">{fuelType.nameRu}</TableCell>
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
                        handleDelete(fuelType.id);
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

        {totalCount > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalCount / pageSize)}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default FuelTypes;