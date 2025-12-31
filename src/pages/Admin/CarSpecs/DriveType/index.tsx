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

interface DriveType {
  id: string;
  nameTk: string;
  nameRu: string;
}

interface NewDriveType {
  id: string;
  nameTk: string;
  nameRu: string;
}

const DriveTypes = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDriveType, setNewDriveType] = useState<NewDriveType>({
    id: "",
    nameTk: "",
    nameRu: "",
  });

  // Temporary data - replace with actual API call
  const driveTypes: DriveType[] = [];
  const totalCount = 0;

  const handleEdit = (driveTypeObj: DriveType) => {
    setNewDriveType({
      id: driveTypeObj.id,
      nameTk: driveTypeObj.nameTk,
      nameRu: driveTypeObj.nameRu,
    });
    setIsModalOpen(true);
  };

  const handleSubmitDriveType = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call
    toast({
      title: "Тип привода создан",
      description: "Новый тип привода успешно добавлен",
      duration: 1000,
    });
    setNewDriveType({
      id: "",
      nameTk: "",
      nameRu: "",
    });
    setIsModalOpen(false);
  };

  const handleDelete = async (driveTypeId: string) => {
    // TODO: Implement API call
    toast({
      title: "Тип привода удален",
      variant: "success",
      duration: 1000,
    });
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
            {driveTypes?.map((driveType) => (
              <TableRow
                key={driveType.id}
                className="transition-all duration-200 hover:bg-primary/10"
              >
                <TableCell className="font-medium">{driveType.nameTk}</TableCell>
                <TableCell className="font-medium">{driveType.nameRu}</TableCell>
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

export default DriveTypes;