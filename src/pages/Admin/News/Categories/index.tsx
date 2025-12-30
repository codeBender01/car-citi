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
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";

import { useGetAllNewsCategory } from "@/api/news/useGetAllNewsCategory";
import { useAddNewsCategory } from "@/api/news/useAddNewsCategory";
import { useRemoveNewsCategory } from "@/api/news/useRemoveNewsCategory";
import { AddNewsCategoryModal } from "./ui/AddNewsCategoryModal";
import type { NewNewsCategory } from "@/interfaces/news.interface";

const NewsCategories = () => {
  const { toast } = useToast();
  const { data: categories } = useGetAllNewsCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<NewNewsCategory>({
    id: "",
    nameTk: "",
    nameRu: "",
  });

  const addNewsCategory = useAddNewsCategory();
  const removeNewsCategory = useRemoveNewsCategory();

  const handleEdit = (categoryObj: NewNewsCategory) => {
    setNewCategory({
      id: categoryObj.id,
      nameTk: categoryObj.nameTk,
      nameRu: categoryObj.nameRu,
    });
    setIsModalOpen(true);
  };

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await addNewsCategory.mutateAsync(newCategory);

    if (res.data) {
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
    } else {
      toast({
        title: "Ошибка",
        description: "Не удалось создать категорию",
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  const handleDelete = async (categoryId: string) => {
    const res = await removeNewsCategory.mutateAsync(categoryId);

    if (res.data) {
      toast({
        title: "Категория удалена",
        variant: "success",
        duration: 1000,
      });
    } else {
      toast({
        title: "Ошибка",
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  console.log(categories);

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary flex items-start justify-between">
        <div>
          <div className="text-[32px] font-bold">Категории новостей</div>
          <p className="text-textSecondary text-base">
            Управление категориями новостей
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

      <AddNewsCategoryModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={newCategory}
        setFormData={setNewCategory}
        onSubmit={handleSubmitCategory}
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
            {categories?.data?.rows?.map((category) => (
              <TableRow
                key={category.id}
                className="transition-all duration-200 hover:bg-primary/10"
              >
                <TableCell className="font-medium">{category.nameTk}</TableCell>
                <TableCell className="font-medium">{category.nameRu}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
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
                        handleDelete(category.id);
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
    </div>
  );
};

export default NewsCategories;
