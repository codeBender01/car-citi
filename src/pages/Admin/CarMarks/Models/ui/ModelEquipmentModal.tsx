import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useGetCarSpecsEquipment } from "@/api/carSpecs/useGetCarSpecsEquipment";
import { useUpsertModelEquipment } from "@/api/carMarks/useUpsertModelEquipment";
import { useRemoveModelEquipment } from "@/api/carMarks/useRemoveModelEquipment";
import { useToast } from "@/hooks/use-toast";
import type { OneCarEquipment } from "@/interfaces/carSpecs.interface";

interface ModelEquipmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modelId: string;
  modelName: string;
  currentEquipments: { id: string; name: string }[];
}

export const ModelEquipmentModal = ({
  open,
  onOpenChange,
  modelId,
  modelName,
  currentEquipments,
}: ModelEquipmentModalProps) => {
  const { toast } = useToast();
  const [selectedEquipmentId, setSelectedEquipmentId] = useState("");
  const { data: allEquipment } = useGetCarSpecsEquipment(1, 100);
  const upsertEquipment = useUpsertModelEquipment();
  const removeEquipment = useRemoveModelEquipment();

  const availableEquipments = allEquipment?.data.rows?.filter(
    (eq: OneCarEquipment) =>
      !currentEquipments.some((ce) => ce.id === eq.id)
  ) || [];

  const handleAdd = async () => {
    if (!selectedEquipmentId) return;
    try {
      await upsertEquipment.mutateAsync({
        carmodelId: modelId,
        equipmentId: selectedEquipmentId,
      });
      toast({
        title: "Комплектация добавлена",
        description: "Комплектация успешно привязана к модели",
        duration: 1000,
      });
      setSelectedEquipmentId("");
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось добавить комплектацию",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleRemove = async (equipmentId: string) => {
    try {
      await removeEquipment.mutateAsync({
        carmodelId: modelId,
        equipmentId,
      });
      toast({
        title: "Комплектация удалена",
        description: "Комплектация успешно отвязана от модели",
        variant: "success",
        duration: 1000,
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить комплектацию",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>Комплектации — {modelName}</DialogTitle>
          <DialogDescription>
            Управление комплектациями модели
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="flex gap-2">
            <Select
              value={selectedEquipmentId}
              onValueChange={setSelectedEquipmentId}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Выберите комплектацию" />
              </SelectTrigger>
              <SelectContent>
                {availableEquipments.map((eq: OneCarEquipment) => (
                  <SelectItem key={eq.id} value={eq.id}>
                    {eq.nameRu}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button
              type="button"
              onClick={handleAdd}
              disabled={!selectedEquipmentId || upsertEquipment.isPending}
              className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#88ba00" }}
            >
              Добавить
            </button>
          </div>

          {currentEquipments.length > 0 && (
            <div className="border rounded-lg divide-y">
              {currentEquipments.map((eq) => (
                <div
                  key={eq.id}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <span className="text-sm font-medium">{eq.name}</span>
                  <Button
                    onClick={() => handleRemove(eq.id)}
                    disabled={removeEquipment.isPending}
                    className="p-2 text-red-600 hover:bg-red-50 bg-transparent rounded-lg transition-colors"
                    title="Удалить"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {currentEquipments.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              Нет привязанных комплектаций
            </p>
          )}
        </div>

        <DialogFooter>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Закрыть
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
