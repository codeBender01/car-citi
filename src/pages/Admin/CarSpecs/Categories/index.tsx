import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { MdOutlineCategory } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { AddCarCategoryModal } from "./ui/AddCarCategoryModal";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

import { useAddCarSpecsCategory } from "@/api/carSpecs/useAddCarSpecsCategory";
import { useGetCarSpecsCategories } from "@/api/carSpecs/useGetCarSpecsCategories";
import { useRemoveCarSpecsCategory } from "@/api/carSpecs/useRemoveCarSpecsCategory";

interface CarCategory {
  id: string;
  nameTk: string;
  nameRu: string;
}

interface NewCarCategory {
  id: string;
  nameTk: string;
  nameRu: string;
}

const CarCategories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const addCategory = useAddCarSpecsCategory();
  const removeCategory = useRemoveCarSpecsCategory();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<CarCategory | null>(null);
  const [newCategory, setNewCategory] = useState<NewCarCategory>({
    id: "",
    nameTk: "",
    nameRu: "",
  });
  const { data: categories } = useGetCarSpecsCategories(currentPage, pageSize);

  console.log(categories);

  const handleEdit = (categoryObj: CarCategory) => {
    setNewCategory({
      id: categoryObj.id,
      nameTk: categoryObj.nameTk,
      nameRu: categoryObj.nameRu,
    });
    setIsModalOpen(true);
  };

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addCategory.mutateAsync(newCategory);

      if (res.data.name) {
        toast({
          title: "Категория создана",
          description: "Новая категория успешно добавлена",
          duration: 1000,
        });
        setNewCategory({
          id: "",
          nameTk: "",
          nameRu: "",
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать категорию",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleConfirmedDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await removeCategory.mutateAsync(categoryToDelete.id);
      toast({
        title: "Категория удалена",
        description: "Категория успешно удалена",
        variant: "success",
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить категорию",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary flex items-start justify-between">
        <div>
          <div className="text-[32px] font-bold">Категории автомобилей</div>
          <p className="text-textSecondary text-base">
            Управление категориями автомобилей
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 text-white font-medium rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          style={{ backgroundColor: "#88ba00" }}
        >
          Добавить категорию
        </button>
      </div>

      <AddCarCategoryModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={newCategory}
        setFormData={setNewCategory}
        onSubmit={handleSubmitCategory}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmedDelete}
        itemName={categoryToDelete ? `${categoryToDelete.nameRu} / ${categoryToDelete.nameTk}` : ''}
        itemType="категорию"
        isLoading={removeCategory.isPending}
      />

      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">Название (тм)</TableHead>
              <TableHead className="font-semibold">Название (ру)</TableHead>
              <TableHead className="font-semibold">Подкатегории</TableHead>
              <TableHead className="font-semibold text-right">
                Действия
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.data.rows?.map((category) => (
              <TableRow
                key={category.id}
                className="transition-all duration-200 hover:bg-primary/10"
              >
                <TableCell className="font-medium">{category.nameTk}</TableCell>
                <TableCell className="font-medium">{category.nameRu}</TableCell>
                <TableCell className="font-medium">
                  {category.subcategories && category.subcategories.length > 0
                    ? category.subcategories.map((sub) => sub.nameRu).join(", ")
                    : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/car-specs/categories/${category.id}`);
                      }}
                      className="p-2 text-green-600 hover:bg-green-50 bg-transparent rounded-lg transition-colors"
                      title="Подкатегории"
                    >
                      <MdOutlineCategory className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(category);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 bg-transparent rounded-lg transition-colors"
                      title="Редактировать"
                    >
                      <FiEdit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCategoryToDelete(category);
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

        {categories && categories.data.count > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(categories.data.count / pageSize)}
            totalCount={categories.data.count}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default CarCategories;
