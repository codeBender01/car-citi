import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BsArrowUpRight } from "react-icons/bs";
import type { NewPostReq } from "@/interfaces/posts.interface";
import {
  formatPhoneNumber,
  validatePhoneNumber,
  cleanPhoneNumber,
} from "@/lib/phoneUtils";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useCheckCarOtp } from "@/api/posts/useCheckCarOtp";
import { toast } from "@/hooks/use-toast";

interface ContactsFormProps {
  formData: NewPostReq;
  setFormData: React.Dispatch<React.SetStateAction<NewPostReq>>;
  onSubmit: () => Promise<void>;
  onSuccess: () => void;
  isSubmitting: boolean;
}

const ContactsForm = ({
  formData,
  setFormData,
  onSubmit,
  onSuccess,
  isSubmitting,
}: ContactsFormProps) => {
  const { t } = useTranslation();
  const checkCarOtp = useCheckCarOtp();
  const [phoneError, setPhoneError] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phone: cleanPhoneNumber(formatted) }));

    if (phoneError) {
      setPhoneError("");
    }
  };

  const handlePhoneBlur = () => {
    const formatted = formatPhoneNumber(formData.phone);
    const validation = validatePhoneNumber(formatted);
    if (!validation.isValid && formatted.length > 4) {
      setPhoneError(validation.error || "");
    }
  };

  const handlePhoneFocus = () => {
    if (!formData.phone || formData.phone.trim() === "") {
      setFormData((prev) => ({ ...prev, phone: "+993" }));
    }
    setPhoneError("");
  };

  const handleSubmitPost = async () => {
    const formatted = formatPhoneNumber(formData.phone);
    const validation = validatePhoneNumber(formatted);

    if (!validation.isValid) {
      setPhoneError(validation.error || "");
      return;
    }

    try {
      await onSubmit();
      setShowOtp(true);
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось создать объявление. Попробуйте еще раз.",
        variant: "destructive",
      });
    }
  };

  const handleCheckOtp = async () => {
    try {
      const res = await checkCarOtp.mutateAsync({
        phone: cleanPhoneNumber(formatPhoneNumber(formData.phone)),
        otp,
      });

      if (res.success) {
        onSuccess();
      }
    } catch {
      toast({
        title: "Ошибка",
        description: "Неверный код. Попробуйте еще раз.",
        variant: "destructive",
      });
    }
  };

  const isPending = isSubmitting || checkCarOtp.isPending;

  return (
    <div className="flex flex-col gap-8">
      <div className="font-dm text-textPrimary">
        <div className="text-base mb-4">{t("addCar.contacts")}</div>
        <div className="max-w-md flex flex-col gap-4">
          <div className="relative w-full">
            <Input
              type="tel"
              value={formatPhoneNumber(formData.phone)}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              onFocus={handlePhoneFocus}
              placeholder="+993"
              aria-invalid={!!phoneError}
              className={cn(
                "w-full h-full px-4 pt-7 pb-2.5 border rounded-xl bg-white font-medium text-textPrimary font-rale focus:outline-none placeholder:text-base transition-colors",
                phoneError
                  ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-[#E1E1E1] focus:border-[#7B3FF2] focus:ring-2 focus:ring-[#7B3FF2]/20",
              )}
            />
            <span className="absolute left-4 top-3 text-sm font-medium text-gray-500 font-rale pointer-events-none">
              {t("auth.phoneNumber")}
            </span>
            {phoneError && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-rale">
                {phoneError}
              </p>
            )}
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              showOtp ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="relative w-full min-h-[60px]">
              <Input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full h-full px-4 pt-7 pb-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale focus:outline-none focus:border-[#7B3FF2] focus:ring-2 focus:ring-[#7B3FF2]/20 placeholder:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="absolute left-4 top-3 text-sm font-medium text-gray-500 font-rale pointer-events-none">
                {t("auth.otp")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-4">
        <Button
          onClick={showOtp ? handleCheckOtp : handleSubmitPost}
          disabled={isPending || !!phoneError}
          size="none"
          className="text-white bg-primary hover:bg-white hover:text-primary font-dm text-[15px] cursor-pointer rounded-xl flex items-center mt-[30px] gap-2.5 py-4 px-[25px] ml-auto w-fit disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? t("addCar.submitting") : t("addCar.submit")}
          <BsArrowUpRight />
        </Button>
      </div>
    </div>
  );
};

export default ContactsForm;
