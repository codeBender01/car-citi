import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAdminLogin } from "@/api/auth/useAdminLogin";

const AdminLoginForm = () => {
  const navigate = useNavigate();

  const adminLogin = useAdminLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (username && password) {
      const res = await adminLogin.mutateAsync({
        login: username,
        password,
      });

      console.log(res);

      if (res.data) {
        localStorage.setItem("adminAccessToken", res.data.token);
        navigate("/admin");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
      <div className="relative w-full min-h-[60px]">
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="admin"
          className="w-full h-full px-4 pt-7 pb-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale focus:outline-none focus:border-[#7B3FF2] focus:ring-2 focus:ring-[#7B3FF2]/20 placeholder:text-base"
        />
        <span className="absolute left-4 top-3 text-sm font-medium text-gray-500 font-rale pointer-events-none">
          Имя пользователя
        </span>
      </div>

      <div className="relative w-full min-h-[60px]">
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full h-full px-4 pt-7 pb-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale focus:outline-none focus:border-[#7B3FF2] focus:ring-2 focus:ring-[#7B3FF2]/20 placeholder:text-base"
        />
        <span className="absolute left-4 top-3 text-sm font-medium text-gray-500 font-rale pointer-events-none">
          Пароль
        </span>
      </div>

      <Button
        type="submit"
        size="none"
        className="text-white bg-primary hover:bg-white hover:text-primary font-dm text-[15px] cursor-pointer rounded-xl flex items-center justify-center mt-2 gap-2.5 py-4 px-[25px] w-full"
      >
        Войти
      </Button>
    </form>
  );
};

export default AdminLoginForm;
