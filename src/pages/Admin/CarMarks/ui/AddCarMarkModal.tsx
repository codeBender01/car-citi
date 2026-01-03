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
import { ImageUpload } from "@/components/ui/image-upload";
import type { NewCarMark } from "@/interfaces/carMarks.interface";
import { useUploadSingle } from "@/api/upload/useUploadSingle";

interface AddCarMarkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: NewCarMark;
  setFormData: Dispatch<SetStateAction<NewCarMark>>;
  onSubmit: (e: React.FormEvent) => void;
}

export const AddCarMarkModal = ({
  open,
  onOpenChange,
  formData,
  setFormData,
  onSubmit,
}: AddCarMarkModalProps) => {
  const uploadSingle = useUploadSingle();

  const handleImageChange = async (file: File | null) => {
    const formDataObj = new FormData();
    if (file) {
      formDataObj.append("file", file);

      const res = await uploadSingle.mutateAsync(formDataObj);
      setFormData({
        ...formData,
        logo: { url: res.data.url, hashblur: res.data.hashblur },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {formData.id ? "Редактировать марку" : "Добавить марку"}
          </DialogTitle>
          <DialogDescription>
            {formData.id
              ? "Обновите марку машины"
              : "Создайте новую марку машины"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            {/* Logo Upload */}
            <div className="grid gap-2">
              <Label>Логотип</Label>
              <ImageUpload
                value={formData.logo?.url}
                onChange={handleImageChange}
                className="max-w-sm h-[150px] w-[300px]"
              />
            </div>

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