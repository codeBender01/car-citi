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

import { useGetAllNewsTags } from "@/api/news/useGetAllNewsTags";
import { useAddNewsTag } from "@/api/news/useAddNewsTag";
import { useRemoveNewsTag } from "@/api/news/useRemoveNewsTag";
import { AddNewsTagModal } from "./ui/AddNewsTagModal";
import type { NewNewsTag } from "@/interfaces/news.interface";

const NewsTags = () => {
  const { toast } = useToast();
  const { data: tags } = useGetAllNewsTags();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTag, setNewTag] = useState<NewNewsTag>({
    id: "",
    nameTk: "",
    nameRu: "",
  });

  const addNewsTag = useAddNewsTag();
  const removeNewsTag = useRemoveNewsTag();

  const handleEdit = (tagObj: NewNewsTag) => {
    setNewTag({
      id: tagObj.id,
      nameTk: tagObj.nameTk,
      nameRu: tagObj.nameRu,
    });
    setIsModalOpen(true);
  };

  const handleSubmitTag = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await addNewsTag.mutateAsync(newTag);

    if (res.data) {
      toast({
        title: "Тэг создан",
        description: "Новый тэг успешно добавлен",
        duration: 1000,
      });
      setNewTag({
        id: "",
        nameTk: "",
        nameRu: "",
      });
      setIsModalOpen(false);
    } else {
      toast({
        title: "Ошибка",
        description: "Не удалось создать тэг",
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  const handleDelete = async (tagId: string) => {
    const res = await removeNewsTag.mutateAsync(tagId);

    if (res.data) {
      toast({
        title: "Тэг удален",
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

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary flex items-start justify-between">
        <div>
          <div className="text-[32px] font-bold">Тэги новостей</div>
          <p className="text-textSecondary text-base">
            Управление тэгами новостей
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 text-white font-medium rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          style={{ backgroundColor: "#88ba00" }}
        >
          Добавить тэг
        </button>
      </div>

      <AddNewsTagModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={newTag}
        setFormData={setNewTag}
        onSubmit={handleSubmitTag}
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
            {tags?.data?.rows?.map((tag) => (
              <TableRow
                key={tag.id}
                className="transition-all duration-200 hover:bg-primary/10"
              >
                <TableCell className="font-medium">{tag.nameTk}</TableCell>
                <TableCell className="font-medium">{tag.nameRu}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(tag);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 bg-transparent rounded-lg transition-colors"
                      title="Редактировать"
                    >
                      <FiEdit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(tag.id);
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

export default NewsTags;