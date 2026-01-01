import { type Dispatch, type SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface NewColor {
  id: string;
  nameTk: string;
  nameRu: string;
  hex: string;
}

interface AddColorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: NewColor;
  setFormData: Dispatch<SetStateAction<NewColor>>;
  onSubmit: (e: React.FormEvent) => void;
}

const PRESET_COLORS = [
  "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00",
  "#FF00FF", "#00FFFF", "#C0C0C0", "#808080", "#800000", "#808000",
  "#008000", "#800080", "#008080", "#000080", "#FFA500", "#FFC0CB",
  "#A52A2A", "#FFD700", "#4B0082", "#EE82EE", "#7FFF00", "#DC143C",
];

export const AddColorModal = ({
  open,
  onOpenChange,
  formData,
  setFormData,
  onSubmit,
}: AddColorModalProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleHexChange = (value: string) => {
    // Ensure hex starts with # and is valid
    let hex = value.toUpperCase();
    if (!hex.startsWith("#")) {
      hex = "#" + hex;
    }
    setFormData({ ...formData, hex });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {formData.id ? "Редактировать цвет" : "Добавить цвет"}
          </DialogTitle>
          <DialogDescription>
            {formData.id
              ? "Обновите цвет"
              : "Создайте новый цвет для автомобилей"}
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

            <div className="grid gap-2">
              <label className="text-sm font-medium">Цвет</label>

              {/* Color Preview and Hex Input */}
              <div className="flex gap-3 items-center">
                <div
                  className="w-16 h-16 rounded-lg border-2 border-gray-300 shadow-sm cursor-pointer transition-transform hover:scale-105"
                  style={{ backgroundColor: formData.hex }}
                  onClick={() => setShowPicker(!showPicker)}
                />
                <div className="flex-1">
                  <Input
                    type="text"
                    value={formData.hex}
                    onChange={(e) => handleHexChange(e.target.value)}
                    placeholder="#000000"
                    pattern="^#[0-9A-Fa-f]{6}$"
                    maxLength={7}
                    className="font-mono uppercase"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Введите HEX код (например: #FF5733)
                  </p>
                </div>
              </div>

              {/* Preset Colors */}
              {showPicker && (
                <div className="p-4 border rounded-lg bg-gray-50">
                  <p className="text-sm font-medium mb-3">Выберите цвет:</p>
                  <div className="grid grid-cols-8 gap-2">
                    {PRESET_COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`w-8 h-8 rounded-md border-2 transition-all hover:scale-110 ${
                          formData.hex === color
                            ? "border-blue-500 ring-2 ring-blue-300"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          setFormData({ ...formData, hex: color });
                          setShowPicker(false);
                        }}
                        title={color}
                      />
                    ))}
                  </div>

                  {/* Native Color Picker */}
                  <div className="mt-4 pt-4 border-t">
                    <label className="text-sm font-medium block mb-2">
                      Или выберите произвольный цвет:
                    </label>
                    <input
                      type="color"
                      value={formData.hex}
                      onChange={(e) => setFormData({ ...formData, hex: e.target.value.toUpperCase() })}
                      className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                    />
                  </div>
                </div>
              )}
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
              {formData.id ? "Обновить" : "Создать"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};