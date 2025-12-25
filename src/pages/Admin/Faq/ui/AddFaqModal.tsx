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
import { useState } from "react";
import { useAddFaq } from "@/api/faq/useAddFaq";

export default function AddFaqModal() {
  const { t } = useTranslation();

  const [faq, setFaq] = useState({
    id: "",
    titleTk: "",
    titleRu: "",
    descriptionTk: "",
    descriptionRu: "",
  });

  const addFaq = useAddFaq();

  const handleSubmitFaq = async () => {
    const res = await addFaq.mutateAsync(faq);

    if (res.data) {
    }
  };

  return (
    <Dialog>
      <form action="">
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
                  setFaq({ ...faq, titleTk: e.target.value });
                }}
                value={faq.titleTk}
              />
            </div>
            <div className="grid gap-3">
              <LabeledInput
                onChange={(e) => {
                  setFaq({ ...faq, titleRu: e.target.value });
                }}
                label="Имя (ру)"
                value={faq.titleRu}
              />
            </div>
            <div className="grid gap-3">
              <div className="relative">
                <Textarea
                  id="descTk"
                  onChange={(e) => {
                    setFaq({ ...faq, descriptionTk: e.target.value });
                  }}
                  value={faq.descriptionTk}
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
                    setFaq({ ...faq, descriptionRu: e.target.value });
                  }}
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
            <Button
              onClick={handleSubmitFaq}
              type="submit"
              className="text-white"
            >
              {addFaq.isPending && <Spinner />}
              {t("common.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
