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

interface Condition {
  id: string;
  nameTk: string;
  nameRu: string;
}

interface NewCondition {
  id: string;
  nameTk: string;
  nameRu: string;
}

const CarConditions = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCondition, setNewCondition] = useState<NewCondition>({
    id: "",
    nameTk: "",
    nameRu: "",
  });

  // Temporary data - replace with actual API call
  const conditions: Condition[] = [];
  const totalCount = 0;

  const handleEdit = (conditionObj: Condition) => {
    setNewCondition({
      id: conditionObj.id,
      nameTk: conditionObj.nameTk,
      nameRu: conditionObj.nameRu,
    });
    setIsModalOpen(true);
  };

  const handleSubmitCondition = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call
    toast({
      title: "Состояние создано",
      description: "Новое состояние успешно добавлено",
      duration: 1000,
    });
    setNewCondition({
      id: "",
      nameTk: "",
      nameRu: "",
    });
    setIsModalOpen(false);
  };

  const handleDelete = async (conditionId: string) => {
    // TODO: Implement API call
    toast({
      title: "Состояние удалено",
      variant: "success",
      duration: 1000,
    });
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
            {conditions?.map((condition) => (
              <TableRow
                key={condition.id}
                className="transition-all duration-200 hover:bg-primary/10"
              >
                <TableCell className="font-medium">{condition.nameTk}</TableCell>
                <TableCell className="font-medium">{condition.nameRu}</TableCell>
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
                        handleDelete(condition.id);
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

export default CarConditions;