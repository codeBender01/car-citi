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
import { Checkbox } from "@/components/ui/checkbox";
import type { EditAdminReq } from "@/interfaces/admins.interface";

interface EditAdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: EditAdminReq;
  setFormData: Dispatch<SetStateAction<EditAdminReq>>;
  onSubmit: (e: React.FormEvent) => void;
  isPending?: boolean;
}

const AVAILABLE_ROLES: { value: string; label: string }[] = [
  { value: "admin", label: "Администратор" },
  { value: "moderator", label: "Модератор" },
  { value: "operator", label: "Оператор" },
  { value: "supportOperator", label: "Оператор поддержки" },
];

export const EditAdminModal = ({
  open,
  onOpenChange,
  formData,
  setFormData,
  onSubmit,
  isPending,
}: EditAdminModalProps) => {
  const toggleRole = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>Редактировать сотрудника</DialogTitle>
          <DialogDescription>
            Измените данные сотрудника
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="editLogin" className="text-sm font-medium">
                Логин
              </label>
              <Input
                id="editLogin"
                type="text"
                value={formData.login}
                onChange={(e) =>
                  setFormData({ ...formData, login: e.target.value })
                }
                placeholder="Введите логин"
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Роли</label>
              <div className="flex flex-col gap-3">
                {AVAILABLE_ROLES.map((role) => (
                  <label
                    key={role.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={formData.roles.includes(role.value)}
                      onCheckedChange={() => toggleRole(role.value)}
                    />
                    <span className="text-sm">{role.label}</span>
                  </label>
                ))}
              </div>
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
              disabled={isPending}
              className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#88ba00" }}
            >
              {isPending ? "Сохранение..." : "Сохранить"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
