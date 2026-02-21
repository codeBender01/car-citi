import { type Dispatch, type SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { NewCarEquipment } from "@/interfaces/carSpecs.interface";

interface AddEquipmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: NewCarEquipment;
  setFormData: Dispatch<SetStateAction<NewCarEquipment>>;
  onSubmit: (e: React.FormEvent) => void;
}

export const AddEquipmentModal = ({
  open,
  onOpenChange,
  formData,
  setFormData,
  onSubmit,
}: AddEquipmentModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {formData.id
              ? "Редактировать комплектацию"
              : "Добавить комплектацию"}
          </DialogTitle>
          <DialogDescription>
            {formData.id
              ? "Измените данные комплектации"
              : "Создайте новую комплектацию для автомобилей"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="nameTk" className="text-sm font-medium">
                Название (Turkmen)
              </label>
              <Input
                id="nameTk"
                type="text"
                value={formData.nameTk}
                onChange={(e) =>
                  setFormData({ ...formData, nameTk: e.target.value })
                }
                placeholder="Введите название на туркменском"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="nameRu" className="text-sm font-medium">
                Название (Русский)
              </label>
              <Input
                id="nameRu"
                type="text"
                value={formData.nameRu}
                onChange={(e) =>
                  setFormData({ ...formData, nameRu: e.target.value })
                }
                placeholder="Введите название на русском"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-all hover:opacity-90"
              style={{ backgroundColor: "#88ba00" }}
            >
              {formData.id ? "Сохранить" : "Создать"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
