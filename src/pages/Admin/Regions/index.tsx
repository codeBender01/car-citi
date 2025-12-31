import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useGetRegionsAdmin } from "@/api/regions/useGetRegionsAdmin";
import { useRemoveRegion } from "@/api/regions/useRemoveRegion";
import { useAddRegion } from "@/api/regions/useAddRegion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { AddRegionModal } from "./ui/AddRegionModal";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { BiSolidCity } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import type { NewRegion } from "@/interfaces/regions.interface";

const Regions = () => {
  const { i18n } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const removeRegion = useRemoveRegion();
  const addRegion = useAddRegion();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const { data: regions } = useGetRegionsAdmin(i18n.language, currentPage, pageSize);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRegion, setNewRegion] = useState({
    nameTk: "",
    nameRu: "",
    id: "",
  });

  const handleEdit = (regionObj: NewRegion) => {
    setNewRegion({
      id: regionObj.id,
      nameRu: regionObj.nameRu,
      nameTk: regionObj.nameTk,
    });
    setIsModalOpen(true);
  };

  const handleAddRegion = async (e: React.FormEvent, regionObj?: NewRegion) => {
    e.preventDefault();
    if (regionObj) {
      setIsModalOpen(true);
      setNewRegion({ ...regionObj });
    }
    const res = await addRegion.mutateAsync(newRegion);

    if (res.data) {
      toast({
        title: "Регион создан",
        description: "Новый регион успешно добавлен",
        duration: 1000,
      });
    }

    setNewRegion({ id: "", nameTk: "", nameRu: "" });
    setIsModalOpen(false);
  };

  const handleDelete = async (regionId: string) => {
    const res = await removeRegion.mutateAsync(regionId);

    if (res.data) {
      toast({
        title: "Регион удален",
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
          <div className="text-[32px] font-bold">Регионы</div>
          <p className="text-textSecondary text-base">
            Управление регионами и локациями
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 text-white font-medium rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          style={{ backgroundColor: "#88ba00" }}
        >
          Добавить регион
        </button>
      </div>

      <AddRegionModal
        formData={newRegion}
        setFormData={setNewRegion}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleAddRegion}
      />
      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">Название (тм)</TableHead>
              <TableHead className="font-semibold">Название (ру)</TableHead>
              <TableHead className="font-semibold">Города</TableHead>
              <TableHead className="font-semibold text-right">
                Действия
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {regions?.data?.rows?.map((region) => (
              <TableRow
                key={region.id}
                className="transition-all duration-200 hover:bg-primary/10"
              >
                <TableCell className="font-medium">{region.nameTk}</TableCell>
                <TableCell className="font-medium">{region.nameRu}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {region.cities?.map((city) => city.name).join(", ") ||
                    "Нет городов"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      onClick={() => {
                        navigate("/admin/regions/" + region.id);
                      }}
                      className="p-2 text-textPrimary hover:bg-gray-300 bg-transparent rounded-lg transition-colors"
                      title="Удалить"
                    >
                      <BiSolidCity className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(region);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 bg-transparent rounded-lg transition-colors"
                      title="Редактировать"
                    >
                      <FiEdit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(region.id);
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

        {regions?.data && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil((regions.data.count || 0) / pageSize)}
            totalCount={regions.data.count || 0}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Regions;
