import { type Dispatch, type SetStateAction } from "react";
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

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

import { useTranslation } from "react-i18next";
import type { NewFaq } from "@/interfaces/faq.interface";

interface AddFaqModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: NewFaq;
  setFormData: Dispatch<SetStateAction<NewFaq>>;
  onSubmit: (e: React.FormEvent) => void;
  isPending?: boolean;
}

export default function AddFaqModal({
  open,
  onOpenChange,
  formData,
  setFormData,
  onSubmit,
  isPending,
}: AddFaqModalProps) {
  const { t } = useTranslation();

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
            <DialogTitle>{t("faqAdmin.addFaq")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <LabeledInput
                label="Имя (тм)"
                onChange={(e) => {
                  setFormData({ ...formData, titleTk: e.target.value });
                }}
                value={formData.titleTk}
              />
            </div>
            <div className="grid gap-3">
              <LabeledInput
                onChange={(e) => {
                  setFormData({ ...formData, titleRu: e.target.value });
                }}
                label="Имя (ру)"
                value={formData.titleRu}
              />
            </div>
            <div className="grid gap-3">
              <div className="relative">
                <Textarea
                  id="descTk"
                  onChange={(e) => {
                    setFormData({ ...formData, descriptionTk: e.target.value });
                  }}
                  value={formData.descriptionTk}
                  className="w-full h-[200px] px-5 py-4 rounded-xl border border-grayBorder bg-white font-dm text-[15px] text-textPrimary resize-none peer"
                />
                <Label
                  htmlFor="descTk"
                  className="absolute left-5 top-4 font-dm text-[13px] text-[#818181] transition-all duration-200 pointer-events-none peer-focus:text-xs peer-focus:top-0 peer-focus:left-3 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
                >
                  Описание (тм)
                </Label>
              </div>
            </div>
            <div className="grid gap-3">
              <div className="relative">
                <Textarea
                  id="descRu"
                  onChange={(e) => {
                    setFormData({ ...formData, descriptionRu: e.target.value });
                  }}
                  value={formData.descriptionRu}
                  className="w-full h-[200px] px-5 py-4 rounded-xl border border-grayBorder bg-white font-dm text-[15px] text-textPrimary resize-none peer"
                />
                <Label
                  htmlFor="descRu"
                  className="absolute left-5 top-4 font-dm text-[13px] text-[#818181] transition-all duration-200 pointer-events-none peer-focus:text-xs peer-focus:top-0 peer-focus:left-3 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
                >
                  Описание (ру)
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t("common.cancel")}</Button>
            </DialogClose>
            <Button type="submit" onClick={onSubmit} className="text-white">
              {isPending && <Spinner />}
              {t("common.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
