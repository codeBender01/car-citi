import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useSendOtp } from "@/api/auth/useSendOtp";
import { useCheckOtp } from "@/api/auth/useCheckOtp";

import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [accountType, setAccountType] = useState<"Personal" | "Business">(
    "Personal"
  );
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const sendOtp = useSendOtp();
  const checkOtp = useCheckOtp();

  const handleSendOtp = async () => {
    await sendOtp.mutateAsync({
      phone,
      accountType,
    });

    setShowOtp(true);
  };

  const handleCheckOtp = async () => {
    const res = await checkOtp.mutateAsync({
      phone,
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

      <div className="relative w-full min-h-[60px]">
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+99"
          className="w-full h-full px-4 pt-7 pb-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale focus:outline-none focus:border-[#7B3FF2] focus:ring-2 focus:ring-[#7B3FF2]/20 placeholder:text-base"
        />
        <span className="absolute left-4 top-3 text-sm font-medium text-gray-500 font-rale pointer-events-none">
          Номер телефона
        </span>
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
        size="none"
        className="text-white bg-primary hover:bg-white hover:text-primary font-dm text-[15px] cursor-pointer rounded-xl flex items-center justify-center mt-2 gap-2.5 py-4 px-[25px] w-full"
      >
        Войти
      </Button>
    </div>
  );
};

export default LoginForm;
