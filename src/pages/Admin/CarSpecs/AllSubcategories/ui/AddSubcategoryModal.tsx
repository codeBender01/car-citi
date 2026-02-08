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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { NewCarSpecsSubcategory } from "@/interfaces/carSpecs.interface";
import { useGetCarSpecsCategories } from "@/api/carSpecs/useGetCarSpecsCategories";

interface AddSubcategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: NewCarSpecsSubcategory;
  setFormData: Dispatch<SetStateAction<NewCarSpecsSubcategory>>;
  onSubmit: (e: React.FormEvent) => void;
}

export const AddSubcategoryModal = ({
  open,
  onOpenChange,
  formData,
  setFormData,
  onSubmit,
}: AddSubcategoryModalProps) => {
  const { data: categories } = useGetCarSpecsCategories(1, 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {formData.id
              ? "Редактировать тип кузова"
              : "Добавить тип кузова"}
          </DialogTitle>
          <DialogDescription>
            {formData.id
              ? "Обновите данные типа кузова"
              : "Создайте новый тип кузова"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="categoryId" className="text-sm font-medium">
                Категория
              </label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  setFormData({ ...formData, categoryId: value })
                }
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.data.rows?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.nameRu} / {category.nameTk}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
