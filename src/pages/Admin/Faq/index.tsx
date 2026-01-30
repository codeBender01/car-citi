import { useState } from "react";
import AddFaqModal from "./ui/AddFaqModal";

import { useAddFaq } from "@/api/faq/useAddFaq";
import { useGetFaqsAdmin } from "@/api/faq/useGetFaqsAdmin";
import { useRemoveFaq } from "@/api/faq/useRemoveFaq";
import { useToast } from "@/hooks/use-toast";
import type { NewFaq } from "@/interfaces/faq.interface";
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
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

const Faq = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const { data: faqs } = useGetFaqsAdmin(currentPage, pageSize);
  const { toast } = useToast();
  const addFaq = useAddFaq();
  const removeFaq = useRemoveFaq();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<NewFaq | null>(null);
  const [newFaq, setNewFaq] = useState<NewFaq>({
    id: "",
    titleTk: "",
    titleRu: "",
    descriptionTk: "",
    descriptionRu: "",
  });

  const handleEdit = (faqObj: NewFaq) => {
    setNewFaq({
      id: faqObj.id,
      titleTk: faqObj.titleTk,
      titleRu: faqObj.titleRu,
      descriptionTk: faqObj.descriptionTk,
      descriptionRu: faqObj.descriptionRu,
    });
    setIsModalOpen(true);
  };

  const handleSubmitFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await addFaq.mutateAsync(newFaq);

    if (res.data) {
      toast({
        title: "FAQ создан",
        description: "Новый вопрос успешно добавлен",
        duration: 1000,
      });
      setNewFaq({
        id: "",
        titleTk: "",
        titleRu: "",
        descriptionTk: "",
        descriptionRu: "",
      });
      setIsModalOpen(false);
    } else {
      toast({
        title: "Ошибка",
        description: "Не удалось создать FAQ",
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  const handleConfirmedDelete = async () => {
    if (!faqToDelete) return;

    const res = await removeFaq.mutateAsync(faqToDelete.id);

    if (res.data) {
      toast({
        title: "FAQ удален",
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
    setFaqToDelete(null);
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm flex items-center justify-between text-textSecondary">
        <div className="text-[32px] font-bold">
          FAQ (недавно заданные вопросы)
        </div>
        <AddFaqModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          formData={newFaq}
          setFormData={setNewFaq}
          onSubmit={handleSubmitFaq}
          isPending={addFaq.isPending}
        />
      </div>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmedDelete}
        itemName={faqToDelete ? `${faqToDelete.titleRu} / ${faqToDelete.titleTk}` : ''}
        itemType="вопрос"
        isLoading={removeFaq.isPending}
      />

      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">Заголовок (тм)</TableHead>
              <TableHead className="font-semibold">Заголовок (ру)</TableHead>
              <TableHead className="font-semibold">Описание (тм)</TableHead>
              <TableHead className="font-semibold">Описание (ру)</TableHead>
              <TableHead className="font-semibold text-right">
                Действия
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs?.data?.rows?.map((faq) => (
              <TableRow
                key={faq.id}
                className="transition-all duration-200 hover:bg-primary/10"
              >
                <TableCell className="font-medium">{faq.titleTk}</TableCell>
                <TableCell className="font-medium">{faq.titleRu}</TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                  {faq.descriptionTk}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                  {faq.descriptionRu}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(faq);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 bg-transparent rounded-lg transition-colors"
                      title="Редактировать"
                    >
                      <FiEdit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFaqToDelete(faq);
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

        {faqs?.data && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil((faqs.data.count || 0) / pageSize)}
            totalCount={faqs.data.count || 0}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Faq;
