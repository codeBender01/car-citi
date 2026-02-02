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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { NewCarCharChild } from "@/interfaces/carSpecs.interface";

interface AddCharChildModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: NewCarCharChild;
  setFormData: Dispatch<SetStateAction<NewCarCharChild>>;
  onSubmit: (e: React.FormEvent) => void;
}

export const AddCharChildModal = ({
  open,
  onOpenChange,
  formData,
  setFormData,
  onSubmit,
}: AddCharChildModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {formData.id ? "Редактировать элемент" : "Добавить элемент"}
          </DialogTitle>
          <DialogDescription>
            {formData.id
              ? "Обновите элемент характеристики"
              : "Создайте новый элемент характеристики"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            {/* Name Turkmen */}
            <div className="grid gap-2">
              <Label htmlFor="nameTk">Название (Turkmen)</Label>
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

            {/* Name Russian */}
            <div className="grid gap-2">
              <Label htmlFor="nameRu">Название (Русский)</Label>
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
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              className="text-white"
              style={{ backgroundColor: "#88ba00" }}
            >
              {formData.id ? "Обновить" : "Создать"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
