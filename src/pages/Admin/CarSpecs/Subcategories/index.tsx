import { useParams, useNavigate } from "react-router-dom";
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
import { FiEdit, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useGetOneCarSpecsCategory } from "@/api/carSpecs/useGetOneCarSpecsCategory";
import { useAddCarSpecsSubcategory } from "@/api/carSpecs/useAddCarSpecsSubcategory";
import { useRemoveCarSpecsSubcategory } from "@/api/carSpecs/useRemoveCarSpecsSubcategory";
import { AddCarSubcategoryModal } from "./ui/AddCarSubcategoryModal";
import type { NewCarSpecsSubcategory } from "@/interfaces/carSpecs.interface";

const CarSubcategories = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const addSubcategory = useAddCarSpecsSubcategory();
  const removeSubcategory = useRemoveCarSpecsSubcategory();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubcategory, setNewSubcategory] = useState<NewCarSpecsSubcategory>({
    nameTk: "",
    nameRu: "",
    categoryId: categoryId as string,
    id: "",
  });

  const { data: category } = useGetOneCarSpecsCategory(
    categoryId as string,
    currentPage,
    pageSize
  );

  const handleEdit = (subcategory: any) => {
    setNewSubcategory({
      id: subcategory.id,
      nameTk: subcategory.nameTk,
      nameRu: subcategory.nameRu,
      categoryId: categoryId as string,
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
            ? "Подкатегория обновлена"
            : "Подкатегория создана",
          description: newSubcategory.id
            ? "Подкатегория успешно обновлена"
            : "Новая подкатегория успешно добавлена",
          duration: 1000,
        });
        setNewSubcategory({
          nameTk: "",
          nameRu: "",
          categoryId: categoryId as string,
          id: "",
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: newSubcategory.id
          ? "Не удалось обновить подкатегорию"
          : "Не удалось создать подкатегорию",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleDelete = async (subcategoryId: string) => {
    try {
      await removeSubcategory.mutateAsync(subcategoryId);
      toast({
        title: "Подкатегория удалена",
        description: "Подкатегория успешно удалена",
        variant: "success",
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить подкатегорию",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary flex items-start justify-between">
        <div>
          <Button
            onClick={() => navigate("/admin/car-specs/categories")}
            className="mb-4 flex items-center gap-2 text-blue-600 hover:bg-blue-50 bg-transparent"
          >
            <FiArrowLeft className="w-4 h-4" />
            Назад к категориям
          </Button>
          <div className="text-[32px] font-bold">
            Подкатегории: {category?.data.nameRu}, {category?.data.nameTk}
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 text-white font-medium rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          style={{ backgroundColor: "#88ba00" }}
        >
          Добавить подкатегорию
        </button>
      </div>

      <AddCarSubcategoryModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={newSubcategory}
        setFormData={setNewSubcategory}
        onSubmit={handleSubmit}
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
            {category?.data.subcategories?.map((subcategory) => (
              <TableRow
                key={subcategory.id}
                className="transition-all duration-200 hover:bg-primary/10"
              >
                <TableCell className="font-medium">
                  {subcategory.nameTk}
                </TableCell>
                <TableCell className="font-medium">
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
                        handleDelete(subcategory.id);
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

        {category?.data.subcategories &&
          category.data.subcategories.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(
                category.data.subcategories.length / pageSize
              )}
              totalCount={category.data.subcategories.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          )}
      </div>
    </div>
  );
};

export default CarSubcategories;
