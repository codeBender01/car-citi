import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Button } from "./button";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  description?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  itemName?: string;
  itemType?: string;
  isLoading?: boolean;
}

export const ConfirmDeleteDialog = ({
  open,
  onOpenChange,
  onConfirm,
  title = "Подтвердить удаление",
  description,
  confirmButtonText = "Да",
  cancelButtonText = "Нет",
  itemName,
  itemType,
  isLoading = false,
}: ConfirmDeleteDialogProps) => {
  const getDescription = () => {
    if (description) return description;

    if (itemName && itemType) {
      return `Вы уверены, что хотите удалить ${itemType} "${itemName}"? Это действие нельзя отменить.`;
    }

    if (itemName) {
      return `Вы уверены, что хотите удалить "${itemName}"? Это действие нельзя отменить.`;
    }

    return "Вы уверены, что хотите удалить этот элемент? Это действие нельзя отменить.";
  };

  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            {cancelButtonText}
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="bg-primary"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Удаление..." : confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
