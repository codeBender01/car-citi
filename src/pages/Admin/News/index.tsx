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
import { Button } from "@/components/ui/button";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

import { useGetNewsAdmin } from "@/api/news/useGetAllNewsAdmin";
import { useAddNews } from "@/api/news/useAddNews";
import { useRemoveNews } from "@/api/news/useRemoveNews";
import { AddNewsModal } from "./ui/AddNewsModal";
import type { NewNews, OneNews } from "@/interfaces/news.interface";

import { BASE_URL } from "@/api";

const News = () => {
  const { toast } = useToast();
  const { data: news } = useGetNewsAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<OneNews | null>(null);
  const [newNews, setNewNews] = useState<NewNews>({
    id: "",
    image: { url: "", hashblur: "" },
    titleTk: "",
    titleRu: "",
    descriptionTk: "",
    descriptionRu: "",
    tagIds: [],
    categoryIds: [],
  });

  const addNews = useAddNews();
  const removeNews = useRemoveNews();

  const handleEdit = (newsObj: OneNews) => {
    setNewNews({
      id: newsObj.id,
      image: newsObj.image,
      titleTk: newsObj.titleTk,
      titleRu: newsObj.titleRu,
      descriptionTk: newsObj.descriptionTk,
      descriptionRu: newsObj.descriptionRu,
      tagIds: newsObj.tags.map((i) => i.id),
      categoryIds: newsObj.categories.map((i) => i.id),
    });
    setIsModalOpen(true);
  };

  const handleSubmitNews = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await addNews.mutateAsync(newNews);

    if (res.data) {
      toast({
        title: "Новость создана",
        description: "Новая новость успешно добавлена",
        duration: 1000,
      });
      setNewNews({
        id: "",
        image: { url: "", hashblur: "" },
        titleTk: "",
        titleRu: "",
        descriptionTk: "",
        descriptionRu: "",
        tagIds: [],
        categoryIds: [],
      });
      setIsModalOpen(false);
    } else {
      toast({
        title: "Ошибка",
        description: "Не удалось создать новость",
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  const handleConfirmedDelete = async () => {
    if (!newsToDelete) return;

    const res = await removeNews.mutateAsync(newsToDelete.id);

    if (res.data) {
      toast({
        title: "Новость удалена",
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

    setDeleteDialogOpen(false);
    setNewsToDelete(null);
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary flex items-start justify-between">
        <div>
          <div className="text-[32px] font-bold">Новости</div>
          <p className="text-textSecondary text-base">
            Управление новостями и публикациями
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 text-white font-medium rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          style={{ backgroundColor: "#88ba00" }}
        >
          Добавить новость
        </button>
      </div>

      <AddNewsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        newsObj={newNews}
        setNewsObj={setNewNews}
        onSubmit={handleSubmitNews}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmedDelete}
        itemName={newsToDelete ? `${newsToDelete.titleRu} / ${newsToDelete.titleTk}` : ''}
        itemType="новость"
        isLoading={removeNews.isPending}
      />

      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">Изображение</TableHead>
              <TableHead className="font-semibold">Заголовок (тм)</TableHead>
              <TableHead className="font-semibold">Заголовок (ру)</TableHead>
              <TableHead className="font-semibold">Описание</TableHead>
              <TableHead className="font-semibold text-right">
                Действия
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news?.data?.rows?.map((newsItem) => (
              <TableRow
                key={newsItem.id}
                className="transition-all duration-200 hover:bg-primary/10"
              >
                <TableCell>
                  {newsItem.image?.url && (
                    <img
                      src={BASE_URL + "/" + newsItem.image.url}
                      alt={newsItem.titleRu}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {newsItem.titleTk}
                </TableCell>
                <TableCell className="font-medium">
                  {newsItem.titleRu}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                  {newsItem.descriptionRu}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(newsItem);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 bg-transparent rounded-lg transition-colors"
                      title="Редактировать"
                    >
                      <FiEdit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setNewsToDelete(newsItem);
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
    </div>
  );
};

export default News;
