import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useSendOtp } from "@/api/auth/useSendOtp";
import { useCheckOtp } from "@/api/auth/useCheckOtp";

import { useNavigate } from "react-router-dom";
import { formatPhoneNumber, validatePhoneNumber, cleanPhoneNumber } from "@/lib/phoneUtils";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [accountType, setAccountType] = useState<"Personal" | "Business">(
    "Personal"
  );
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const sendOtp = useSendOtp();
  const checkOtp = useCheckOtp();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);

    // Clear error when user types
    if (phoneError) {
      setPhoneError("");
    }
  };

  const handlePhoneBlur = () => {
    const validation = validatePhoneNumber(phone);
    if (!validation.isValid && phone.length > 4) {
      setPhoneError(validation.error || "");
    }
  };

  const handlePhoneFocus = () => {
    if (!phone || phone.trim() === "") {
      setPhone("+993 ");
    }
    setPhoneError("");
  };

  const handleSendOtp = async () => {
    const validation = validatePhoneNumber(phone);

    if (!validation.isValid) {
      setPhoneError(validation.error || "Неверный формат номера");
      toast({
        title: "Ошибка",
        description: validation.error || "Неверный формат номера телефона",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    try {
      await sendOtp.mutateAsync({
        phone: cleanPhoneNumber(phone),
        accountType,
      });
      setShowOtp(true);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить код",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleCheckOtp = async () => {
    const res = await checkOtp.mutateAsync({
      phone: cleanPhoneNumber(phone),
      otp,
    });

    if (res.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-4">
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="accountType"
            value="Personal"
            checked={accountType === "Personal"}
            onChange={(e) =>
              setAccountType(e.target.value as "Personal" | "Business")
            }
            className="w-4 h-4 accent-textPrimary cursor-pointer"
          />
          <span
            className={`font-rale text-base ${
              accountType === "Personal"
                ? "text-textPrimary font-medium"
                : "text-gray-500"
            }`}
          >
            Личный аккаунт
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="accountType"
            value="Business"
            checked={accountType === "Business"}
            onChange={(e) =>
              setAccountType(e.target.value as "Personal" | "Business")
            }
            className="w-4 h-4 accent-textPrimary cursor-pointer"
          />
          <span
            className={`font-rale text-base ${
              accountType === "Business"
                ? "text-textPrimary font-medium"
                : "text-gray-500"
            }`}
          >
            Бизнес аккаунт
          </span>
        </label>
      </div>

      <div className="relative w-full">
        <Input
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
          onFocus={handlePhoneFocus}
          placeholder="+993"
          aria-invalid={!!phoneError}
          className={cn(
            "w-full h-full px-4 pt-7 pb-2.5 border rounded-xl bg-white font-medium text-textPrimary font-rale focus:outline-none placeholder:text-base transition-colors",
            phoneError
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-[#E1E1E1] focus:border-[#7B3FF2] focus:ring-2 focus:ring-[#7B3FF2]/20"
          )}
        />
        <span className="absolute left-4 top-3 text-sm font-medium text-gray-500 font-rale pointer-events-none">
          Номер телефона
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
            OTP
          </span>
        </div>
      </div>

      <Button
        onClick={showOtp ? handleCheckOtp : handleSendOtp}
        disabled={showOtp ? false : !!phoneError || sendOtp.isPending}
        size="none"
        className={cn(
          "text-white bg-primary hover:bg-white hover:text-primary font-dm text-[15px] rounded-xl flex items-center justify-center mt-2 gap-2.5 py-4 px-[25px] w-full transition-all",
          (phoneError || sendOtp.isPending) && !showOtp
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        )}
      >
        {sendOtp.isPending ? "Отправка..." : "Войти"}
      </Button>
    </div>
  );
};

export default LoginForm;
