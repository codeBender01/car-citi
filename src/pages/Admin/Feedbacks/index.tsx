import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Pagination from "@/components/Pagination";
import { useGetFeedbacks } from "@/api/feedback.ts/useGetFeedbacks";
import { useRemoveFeedback } from "@/api/feedback.ts/useDeleteFeedback";
import { useToast } from "@/hooks/use-toast";
import type { OneFeedback } from "@/interfaces/feedback.interface";
import dayjs from "dayjs";

const Feedbacks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState<OneFeedback | null>(
    null,
  );

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: feedbacks, isLoading } = useGetFeedbacks({
    page: currentPage - 1,
    pageSize: ITEMS_PER_PAGE,
    search: debouncedSearch || undefined,
  });
  const removeFeedback = useRemoveFeedback();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      await removeFeedback.mutateAsync(id);
      toast({
        title: "Успешно",
        description: "Отзыв удален",
        variant: "success",
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить отзыв",
        variant: "destructive",
      });
    }
  };

  const rows = feedbacks?.data?.rows || [];
  const totalItems = feedbacks?.data?.count || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-10">
        <div className="text-[32px] font-bold">Отзывы</div>
        <p className="text-textSecondary text-base">
          Управление отзывами пользователей
        </p>
      </div>

      <div className="w-full border border-headerBorder rounded-2xl p-4">
        {/* Search */}
        <div className="my-6 flex justify-between items-center">
          <div className="text-textPrimary flex items-center flex-1 max-w-md">
            <CiSearch />
            <Input
              className="border-none shadow-none w-full text-textPrimary placeholder:text-textPrimary"
              placeholder="Поиск по названию, email, телефону..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-2xl px-9 py-16 border border-grayBorder text-center">
            <p className="font-dm text-textGray text-base">Загрузка...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-mainBg hover:bg-mainBg border-none">
                    <TableHead className="font-dm font-medium text-base text-primary">
                      Название
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary">
                      Email
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary">
                      Телефон
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary">
                      Дата
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary">
                      Действие
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((feedback) => (
                    <TableRow
                      key={feedback.id}
                      className="hover:bg-mainBg/50"
                    >
                      <TableCell className="font-dm text-sm text-textSecondary">
                        {feedback.title}
                      </TableCell>
                      <TableCell className="font-dm text-sm text-textSecondary">
                        {feedback.email}
                      </TableCell>
                      <TableCell className="font-dm text-sm text-textSecondary">
                        {feedback.phone || "-"}
                      </TableCell>
                      <TableCell className="font-dm text-sm text-textSecondary">
                        {feedback.created
                          ? dayjs(feedback.created).format("DD.MM.YYYY")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedFeedback(feedback)}
                            className="p-2 hover:bg-mainBg rounded-lg transition-colors text-textGray hover:text-primary"
                            title="Просмотр"
                          >
                            <FiEye size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(feedback.id)}
                            disabled={removeFeedback.isPending}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-textGray hover:text-red-600 disabled:opacity-50"
                            title="Удалить"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {rows.length === 0 && (
              <div className="bg-white rounded-2xl px-9 py-16 border border-grayBorder text-center">
                <p className="font-dm text-textGray text-base">
                  Нет отзывов для отображения
                </p>
              </div>
            )}

            {rows.length > 0 && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>

      <Dialog
        open={!!selectedFeedback}
        onOpenChange={(open) => {
          if (!open) setSelectedFeedback(null);
        }}
      >
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle className="font-dm text-xl">
              {selectedFeedback?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 font-dm text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-textGray">Email</span>
              <span className="text-textPrimary">
                {selectedFeedback?.email}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-textGray">Телефон</span>
              <span className="text-textPrimary">
                {selectedFeedback?.phone || "-"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-textGray">Дата</span>
              <span className="text-textPrimary">
                {selectedFeedback?.created
                  ? dayjs(selectedFeedback.created).format("DD.MM.YYYY HH:mm")
                  : "-"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-textGray">Описание</span>
              <p className="text-textPrimary whitespace-pre-wrap">
                {selectedFeedback?.description}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Feedbacks;
