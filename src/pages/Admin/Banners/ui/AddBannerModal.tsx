import { type Dispatch, type SetStateAction, useRef } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LabeledInput from "@/components/LabeledInput";
import { Spinner } from "@/components/ui/spinner";
import { useTranslation } from "react-i18next";
import { useUploadSingle } from "@/api/upload/useUploadSingle";
import { useToast } from "@/hooks/use-toast";
import { BASE_URL } from "@/api";
import type { NewBanner } from "@/interfaces/banners.interface";

interface AddBannerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: NewBanner;
  setFormData: Dispatch<SetStateAction<NewBanner>>;
  onSubmit: (e: React.FormEvent) => void;
  isPending?: boolean;
}

export default function AddBannerModal({
  open,
  onOpenChange,
  formData,
  setFormData,
  onSubmit,
  isPending,
}: AddBannerModalProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const uploadSingle = useUploadSingle();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const res = await uploadSingle.mutateAsync(formDataUpload);
      if (res.data) {
        setFormData({
          ...formData,
          image: {
            url: res.data.url,
            hashblur: res.data.hashblur,
          },
        });
        toast({
          title: "Изображение загружено",
          variant: "success",
          duration: 1000,
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка загрузки",
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form onSubmit={onSubmit}>
        <DialogTrigger asChild>
          <Button className="text-white text-lg p-5! cursor-pointer">
            {t("common.add")}
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[700px]">
          <DialogHeader>
            <DialogTitle>Добавить баннер</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <LabeledInput
                label="Ссылка"
                onChange={(e) => {
                  setFormData({ ...formData, link: e.target.value });
                }}
                value={formData.link}
                placeholder="https://example.com"
              />
            </div>
            <div className="grid gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Изображение</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadSingle.isPending}
                >
                  {uploadSingle.isPending ? (
                    <>
                      <Spinner />
                      Загрузка...
                    </>
                  ) : (
                    "Выбрать изображение"
                  )}
                </Button>
                {formData.image.url && (
                  <div className="mt-2 relative w-full h-[200px] border rounded-lg overflow-hidden">
                    <img
                      src={`${BASE_URL}/${formData.image.url}`}
                      alt="Banner preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t("common.cancel")}</Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={onSubmit}
              className="text-white"
              disabled={!formData.image.url || !formData.link}
            >
              {isPending && <Spinner />}
              {t("common.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}