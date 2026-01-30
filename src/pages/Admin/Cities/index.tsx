import { useParams } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useGetOneRegion } from "@/api/regions/useGetOneRegion";
import { useAddCityToTheRegion } from "@/api/regions/useAddCityToTheRegion";
import { useRemoveCity } from "@/api/regions/useRemoveCity";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { AddCityModal } from "./ui/AddCityModal";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";
import type { NewCity } from "@/interfaces/regions.interface";

const Cities = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cityToDelete, setCityToDelete] = useState<{ id: string; name: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [newCity, setNewCity] = useState<NewCity>({
    nameTk: "",
    nameRu: "",
    regionId: id as string,
  });

  const { data: region } = useGetOneRegion(id as string, currentPage, pageSize);

  console.log(region);
  const addCity = useAddCityToTheRegion();
  const deleteCity = useRemoveCity();

  const handleEdit = (cityObj: NewCity) => {
    setNewCity({
      id: cityObj.id,
      nameRu: cityObj.nameRu,
      nameTk: cityObj.nameTk,
      regionId: id as string,
    });
    setIsModalOpen(true);
  };

  const handleAddCity = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await addCity.mutateAsync(newCity);

    if (res.data) {
      toast({
        title: "Город создан",
        description: "Новый город успешно добавлен",
        duration: 1000,
      });
    }

    setNewCity({ nameTk: "", nameRu: "", regionId: id as string });
    setIsModalOpen(false);
  };

  const handleConfirmedDelete = async () => {
    if (!cityToDelete) return;

    const res = await deleteCity.mutateAsync(cityToDelete.id);

    if (res.data) {
      toast({
        title: "Город удален",
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
    setCityToDelete(null);
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary flex items-start justify-between">
        <div>
          <div className="text-[32px] font-bold">Города</div>
          <p className="text-textSecondary text-base">
            Управление городами региона:{" "}
            <strong>{region?.data?.name || "Загрузка..."}</strong>
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 text-white font-medium rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer"
          style={{ backgroundColor: "#88ba00" }}
        >
          Добавить город
        </button>
      </div>

      <AddCityModal
        formData={newCity}
        setFormData={setNewCity}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleAddCity}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmedDelete}
        itemName={cityToDelete ? cityToDelete.name : ''}
        itemType="город"
        isLoading={deleteCity.isPending}
      />

      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">Название (тм)</TableHead>
              <TableHead className="font-semibold">Название (ру)</TableHead>
              <TableHead className="font-semibold">Регион</TableHead>
              <TableHead className="font-semibold text-right">
                Действия
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {region?.data?.cities?.map((city) => (
              <TableRow
                key={city.id}
                className="transition-all duration-200 hover:bg-primary/10"
              >
                <TableCell className="font-medium">{city.name}</TableCell>
                <TableCell className="font-medium">{city.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {region?.data?.name || "Нет региона"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit({
                          id: city.id,
                          nameTk: city.name,
                          nameRu: city.name,
                          regionId: city.regionId,
                        });
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 bg-transparent rounded-lg transition-colors"
                      title="Редактировать"
                    >
                      <FiEdit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCityToDelete({ id: city.id, name: city.name });
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

        {region?.data?.cities && region.data.cities.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(region.data.cities.length / pageSize)}
            totalCount={region.data.cities.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Cities;
